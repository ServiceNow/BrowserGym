import re
from datetime import datetime
from pathlib import Path
from typing import List, Tuple
from browsergym.core.action.parsers import highlevel_action_parser

def extract_datetime_from_exp_dir(exp_dir: Path) -> datetime:
    """Extract datetime from experiment directory name.
    
    Expected format: YYYY-MM-DD_HH-MM-SS_rest_of_name
    Example: 2024-12-17_04-11-25_DemoAgentArgs_on_workarena.servicenow.order-ipad-pro_14
    """
    dir_name = exp_dir.name
    # Extract the datetime part (first two segments separated by _)
    datetime_str = '_'.join(dir_name.split('_')[:2])
    try:
        return datetime.strptime(datetime_str, "%Y-%m-%d_%H-%M-%S")
    except ValueError:
        return datetime.now()

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

def log_metadata(logger, steps_info):
    """Log metadata about StepInfo attributes and observation keys."""
    if not steps_info:
        return
        
    first_step = steps_info[0]
    
    # Log available attributes
    logger.debug("Available StepInfo attributes:")
    for attr in dir(first_step):
        if not attr.startswith('_'):  # Skip private attributes
            logger.debug(f"- {attr}")
            
    # Log observation keys if available
    if hasattr(first_step, 'obs') and first_step.obs:
        logger.debug("\nObservation keys:")
        for key in first_step.obs.keys():
            logger.debug(f"- {key}")

def extract_action(text: str) -> str:
    """Extract action from a text containing both reasoning and action command.
    
    Args:
        text (str): Input text containing reasoning and action command in markdown code blocks
        
    Returns:
        str: Extracted action command
    """
    # Find content within code blocks (```...```)
    code_block_pattern = r'```(.*?)```'
    code_blocks = re.findall(code_block_pattern, text, re.DOTALL)
    
    if not code_blocks:
        return ""
    
    # Get the first code block and clean it
    action_text = code_blocks[0].strip()
    
    try:
        # Parse the action string
        function_calls = highlevel_action_parser.parse_string(action_text, parse_all=True)
        
        if function_calls:
            name, arguments = function_calls[0]
            # Format arguments as strings with proper quotes
            formatted_args = [repr(arg) for arg in arguments]
            # Reconstruct the action string
            return f"{name}({', '.join(formatted_args)})"
            
    except Exception as e:
        print(f"Error parsing action: {e}")
        
    return ""