import logging
import re
from pathlib import Path
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List, Optional, Tuple, Union

from browsergym.experiments.loop import ExpResult
from browsergym.core.action.highlevel import HighLevelActionSet
from accessibility_path_finder import parse_accessibility_tree, get_path_to_bid
from action_extractor import extract_action

@dataclass
class PastAction:
    step: int
    action: str
    breadcrumb_paths: List[Tuple[str, str, List[dict]]]  # List of (bid, label, path)
    error: Optional[str]
    
    def format(self) -> str:
        """Format this past action into markdown text."""
        formatted_text = []
        
        # Action header and content
        formatted_text.append(f"#### PastAction{str(self.step).zfill(3)}\n\n")
        formatted_text.append("##### Selected Action in the BrowserGym format\n\n")
        formatted_text.append(f"```\n{self.action}\n```\n\n")
        
        # DOM Tree Breadcrumb (only if we have paths)
        if self.breadcrumb_paths:
            formatted_text.append("##### DOM Tree Breadcrumb\n\n")
            for bid, label, path in self.breadcrumb_paths:
                formatted_text.append(f"**{label}** (bid: {bid})\n")
                if path:
                    formatted_text.append("Path to element:\n```\n")
                    for i, node in enumerate(path):
                        indent = "  " * i
                        formatted_text.append(f"{indent}[{node['bid']}] {node['role']}: '{node['name']}'\n")
                    formatted_text.append("```\n\n")
                else:
                    formatted_text.append(f"No path found for bid: {bid}\n\n")
        
        # Outcome/Errors
        formatted_text.append("##### Outcome including errors\n\n")
        if self.error:
            formatted_text.append(f"Error: {self.error}\n\n")
        else:
            formatted_text.append("No errors reported\n\n")
            
        return "".join(formatted_text)

class PastActionTracker:
    def __init__(self):
        self.actions: Dict[int, PastAction] = {}  # Dictionary with step as key
        self.axtrees: Dict[int, str] = {}  # Dictionary to store accessibility trees for each step
    
    def add_action(self, step_info) -> None:
        """
        Add a new action to the tracker.
        For each step N, we:
        1. Store the current axtree for potential future use
        2. Process the last_action (if any) using the axtree from step N-1
        """
        current_step = step_info.step
        
        # Store current step's accessibility tree
        if 'axtree_txt' in step_info.obs:
            self.axtrees[current_step] = step_info.obs['axtree_txt']
        
        # Skip processing last_action for step 0 as it won't have any
        if current_step == 0:
            return
            
        last_action = step_info.obs.get('last_action', '')
        if not last_action:
            return
            
        clean_action = extract_action(last_action)
        breadcrumb_paths = []
        
        # Use the accessibility tree from the previous step to process the action
        previous_step = current_step - 1
        if previous_step in self.axtrees:
            bid_info = extract_bids_from_action(last_action)
            if bid_info:
                root = parse_accessibility_tree(self.axtrees[previous_step])
                for bid, label in bid_info:
                    path = get_path_to_bid(root, bid)
                    breadcrumb_paths.append((bid, label, path))
        
        # Store the action with the previous step number
        action = PastAction(
            step=previous_step,
            action=clean_action,
            breadcrumb_paths=breadcrumb_paths,
            error=step_info.obs.get('last_action_error')
        )
        self.actions[previous_step] = action
    
    def format_history(self, current_step: int) -> str:
        """Format history of past actions up to current_step."""
        if current_step <= 0:
            return ""
            
        formatted_text = []
        # Format all actions from 0 to current_step-1 in order
        for step in range(current_step):
            if step in self.actions:
                formatted_text.append(self.actions[step].format())
        
        return "".join(formatted_text)

def extract_bids_from_action(action: str) -> List[Tuple[str, str]]:
    """
    Extract bids from action with their context labels.
    Returns list of tuples: (bid, label)
    """
    # Handle drag_and_drop specially
    drag_drop_match = re.match(r"drag_and_drop\('([a-zA-Z0-9]+)',\s*'([a-zA-Z0-9]+)'", action)
    if drag_drop_match:
        return [
            (drag_drop_match.group(1), "Source Element"),
            (drag_drop_match.group(2), "Target Element")
        ]
    
    # Handle single bid actions
    single_bid_patterns = [
        (r"fill\('([a-zA-Z0-9]+)'", "Input Element"),
        (r"select_option\('([a-zA-Z0-9]+)'", "Select Element"),
        (r"click\('([a-zA-Z0-9]+)'", "Clicked Element"),
        (r"dblclick\('([a-zA-Z0-9]+)'", "Double-clicked Element"),
        (r"hover\('([a-zA-Z0-9]+)'", "Hovered Element"),
        (r"press\('([a-zA-Z0-9]+)'", "Pressed Element"),
        (r"focus\('([a-zA-Z0-9]+)'", "Focused Element"),
        (r"clear\('([a-zA-Z0-9]+)'", "Cleared Element"),
        (r"upload_file\('([a-zA-Z0-9]+)'", "Upload Element"),
    ]
    
    for pattern, label in single_bid_patterns:
        match = re.search(pattern, action)
        if match:
            return [(match.group(1), label)]
    
    return []

def setup_logger(debug_mode: bool = False):
    """
    Set up logger with appropriate logging levels and handlers.
    
    Args:
        debug_mode: If True, sets logging level to DEBUG, otherwise INFO
    """
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG if debug_mode else logging.INFO)
    
    # Remove existing handlers to avoid duplicates
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
    
    # Create console handler with appropriate logging level
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG if debug_mode else logging.INFO)
    
    # Create formatter
    formatter = logging.Formatter('%(levelname)s: %(message)s')
    console_handler.setFormatter(formatter)
    
    # Add handler to logger
    logger.addHandler(console_handler)
    
    return logger

def log_metadata(logger, steps_info):
    """Log metadata about StepInfo attributes and observation keys."""
    if not steps_info:
        return
        
    first_step = steps_info[0]
    
    logger.debug("\nAvailable attributes in StepInfo:")
    logger.debug("="*50)
    for attr in vars(first_step):
        logger.debug(f"- {attr}: {type(getattr(first_step, attr))}")
        
    if first_step.obs:
        logger.debug("\nAvailable keys in observation:")
        logger.debug("="*50)
        for key in first_step.obs.keys():
            logger.debug(f"- {key}: {type(first_step.obs[key])}")
            
    logger.debug("="*50 + "\n")

def get_system_message_template(chat_mode: bool) -> str:
    """Get the appropriate system message template based on chat mode."""
    if chat_mode:
        return """\
# Instructions

You are a UI Assistant, your goal is to help the user perform tasks using a web browser. You can
communicate with the user via a chat, to which the user gives you instructions and to which you
can send back messages. You have access to a web browser that both you and the user can see,
and with which only you can interact via specific commands.

Review the instructions from the user, the current state of the page and all other information
to find the best possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions."""
    else:
        return """\
# Instructions

Review the current state of the page and all other information to find the best
possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions."""

def get_next_action_template() -> str:
    """Get the next action prompt template."""
    return """\
# Next action

You will now think step by step and produce your next best action. Reflect on your past actions, any resulting error message, and the current state of the page before deciding on your next action."""

def extract_datetime_from_exp_dir(exp_dir: str | Path) -> datetime:
    """Extract datetime from experiment directory name.
    
    Args:
        exp_dir: Path to experiment directory (e.g. "2024-02-14_15-30-45_agent_on_task_123")
        
    Returns:
        datetime object
    """
    exp_dir = str(exp_dir)  # Convert Path to string if needed
    dir_name = Path(exp_dir).name  # Get just the directory name
    date_str = dir_name.split('_', 2)[:2]  # Split on _ and take first two parts
    datetime_str = '_'.join(date_str)  # Rejoin with _ to get "YYYY-MM-DD_HH-MM-SS"
    return datetime.strptime(datetime_str, "%Y-%m-%d_%H-%M-%S")

def log_experiment_details(exp_dir: str | Path, debug_mode: bool = False):
    """
    Log experiment details in a structured markdown format.
    
    Args:
        exp_dir: Path to the experiment directory
        debug_mode: If True, enables debug logging
    """
    logger = setup_logger(debug_mode)
    
    try:
        # Load experiment results
        logger.info(f"Loading experiment from: {exp_dir}")
        exp_result = ExpResult(exp_dir)
        steps_info = exp_result.steps_info
        
        # Create action tracker
        tracker = PastActionTracker()
        
        # Process all steps first to build complete history
        for step_info in steps_info:
            tracker.add_action(step_info)

        # Log metadata if in debug mode
        log_metadata(logger, steps_info)
        
        # Create action set to get description
        action_set = HighLevelActionSet(
            subsets=["chat", "tab", "nav", "bid", "infeas"],
            strict=False,
            multiaction=False,
            demo_mode="off"
        )
        
        with open(f"{exp_dir}/experiment_analysis.md", 'w') as f:
            # 1 - Global Parameters
            f.write("# 1 - Global Parameters\n\n\n")

            f.write("## Task\n\n")

            if steps_info and steps_info[0].obs and "goal_object" in steps_info[0].obs:
                goal_object = steps_info[0].obs["goal_object"]
                goal_texts = []
                
                # Extract all text messages from goal_object
                for message in goal_object:
                    if isinstance(message, dict) and message.get("type") == "text":
                        goal_texts.append(message["text"])
                
                if goal_texts:
                    f.write("* **Derived Goal**:\n")
                    for text in goal_texts:
                        f.write(f"  {text}\n")
                else:
                    f.write("* **Derived Goal**: No text goals found in goal_object\n")
            else:
                f.write("* **Derived Goal**: No goal information available\n")

            f.write("## Run Parameters\n\n")
            
            # Get experiment date from exp_result
            exp_date = extract_datetime_from_exp_dir(exp_dir)
            f.write(f"* **Date of Instance Run**: {exp_date.strftime('%Y-%m-%d %H:%M:%S')}\n")
            
            # Get experiment ID
            trace_id = steps_info[0].agent_info.get('trace_id', '')
            f.write(f"* **Trace ID**: {trace_id}\n")
            
            # Get model info from first step's agent_info
            if steps_info and steps_info[0].agent_info:
                model_info = steps_info[0].agent_info.get('model_info', {})
                if model_info:
                    f.write("\n### Model Configuration\n")
                    for key, value in model_info.items():
                        if isinstance(value, dict):
                            f.write(f"\n#### {key}\n")
                            for subkey, subvalue in value.items():
                                f.write(f"* **{subkey}**: {subvalue}\n")
                        else:
                            f.write(f"* **{key}**: {value}\n")
            
            f.write("\n")

            # 2 - Instance Type
            f.write("# 2 - Instance Type\n\n\n")
            
            # Write details for each step
            for step_info in steps_info:
                logger.debug(f"Processing step {step_info.step}")
                
                # Instance Step
                f.write(f"## InstanceStep{str(step_info.step).zfill(3)}\n\n\n")
                
                # State of the World
                f.write("### State of the World\n\n")
                
                # Currently Open Tabs
                f.write("#### Currently Open Tabs\n\n")
                if step_info.obs:
                    for idx, (url, title) in enumerate(zip(
                        step_info.obs['open_pages_urls'], 
                        step_info.obs['open_pages_titles']
                    )):
                        active = "(active)" if idx == step_info.obs['active_page_index'] else ""
                        f.write(f"- Tab {idx} {active}\n")
                        f.write(f"  - Title: {title}\n")
                        f.write(f"  - URL: {url}\n")
                f.write("\n\n")
                
                # Current Page Accessibility Tree
                f.write("#### Current Page Accessibility Tree\n\n")
                if step_info.obs and 'axtree_txt' in step_info.obs:
                    f.write(f"```\n{step_info.obs['axtree_txt']}\n```\n\n")
                
                # History of Past Actions
                past_actions = tracker.format_history(step_info.step)
                if past_actions:
                    f.write("### History of Past Actions\n\n")
                    f.write(past_actions)
                else:
                    f.write("### History of Past Actions\n\n")
                    f.write("No previous actions\n\n")
                
                # Next Action - LLM Reasoning
                f.write("### Next Action\n\n")
                if step_info.action:
                    f.write(f"```\n{step_info.action}\n```\n\n")
                else:
                    f.write("No next action available\n\n")
            
            # 3 - Templates
            f.write("# 3 - Templates\n\n\n")
            
            # System Message Templates
            f.write("## System Message - Template (Chat Mode)\n\n")
            f.write("```\n")
            f.write(get_system_message_template(chat_mode=True))
            f.write("\n```\n\n")
            
            f.write("## System Message - Template (Task Mode)\n\n")
            f.write("```\n")
            f.write(get_system_message_template(chat_mode=False))
            f.write("\n```\n\n")

            # Action Space Template
            f.write("## Action Space - Template\n\n")
            f.write("```\n")
            f.write(action_set.describe(with_long_description=False, with_examples=True))
            f.write("\n```\n")

            # Next Action Template
            f.write("## Next Action - Template\n\n")
            f.write("```\n")
            f.write(get_next_action_template())
            f.write("\n```\n")
            
        logger.info(f"Analysis saved to {exp_dir}/experiment_analysis.md")
        logger.info(f"Processed {len(steps_info)} steps")
                    
    except Exception as e:
        logger.error(f"Error analyzing experiment: {e}")
        raise

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Analyze BrowserGym experiment results")
    parser.add_argument("exp_dir", type=str, help="Path to experiment directory")
    parser.add_argument("--debug", action="store_true", help="Enable debug mode logging")
    
    args = parser.parse_args()
    
    log_experiment_details(args.exp_dir, debug_mode=args.debug)