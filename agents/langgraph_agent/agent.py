import base64
import dataclasses
import io
import logging
import os, getpass

import numpy as np
from PIL import Image
from IPython.display import display
from IPython.display import Image as IPythonImage
from typing import Dict, List, Optional

from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import START, END, StateGraph, MessagesState
from langgraph.prebuilt import tools_condition, ToolNode

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.experiments import AbstractAgentArgs, Agent
from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str, prune_html

logger = logging.getLogger(__name__)

def _set_env(var: str):
    if not os.environ.get(var):
        os.environ[var] = getpass.getpass(f"{var}: ")

_set_env("OPENAI_API_KEY")
_set_env("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "browsergym"

def image_to_jpg_base64_url(image: np.ndarray | Image.Image):
    """Convert a numpy array to a base64 encoded image url."""

    if isinstance(image, np.ndarray):
        image = Image.fromarray(image)
    if image.mode in ("RGBA", "LA"):
        image = image.convert("RGB")

    with io.BytesIO() as buffer:
        image.save(buffer, format="JPEG")
        image_base64 = base64.b64encode(buffer.getvalue()).decode()

    return f"data:image/jpeg;base64,{image_base64}"

class BrowserState(MessagesState):
    """Graph-state for browser-based agent interactions."""

    chat_messages: Optional[List[dict]]
    screenshot: Optional[np.ndarray]
    goal_object: List[dict]
    last_action: Optional[str]
    last_action_error: Optional[str]
    open_pages_urls: List[str]
    open_pages_titles: List[str]
    active_page_index: np.ndarray
    axtree_txt: str
    pruned_html: str

class DemoAgent(Agent):
    """A basic agent using langgraph, to utilize BrowserGym's functionalities."""

    def obs_preprocessor(self, obs: dict) -> dict:

        return {
            "chat_messages": obs["chat_messages"],
            "screenshot": obs["screenshot"],
            "goal_object": obs["goal_object"],
            "last_action": obs["last_action"],
            "last_action_error": obs["last_action_error"],
            "open_pages_urls": obs["open_pages_urls"],
            "open_pages_titles": obs["open_pages_titles"],
            "active_page_index": obs["active_page_index"],
            "axtree_txt": flatten_axtree_to_str(obs["axtree_object"]),
            "pruned_html": prune_html(flatten_dom_to_str(obs["dom_object"])), 
        }

    def __init__(
        self,
        model_name: str,
        chat_mode: bool,
        demo_mode: str,
        use_html: bool,
        use_axtree: bool,
        use_screenshot: bool,
    ) -> None:
        super().__init__()
        self.model_name = model_name
        self.chat_mode = chat_mode # haven't digged deep into this functionality
        self.use_html = use_html
        self.use_axtree = use_axtree
        self.use_screenshot = use_screenshot 

        if not (use_html or use_axtree):
            raise ValueError(f"Either use_html or use_axtree must be set to True.")
        
        self.action_set = HighLevelActionSet(
            subsets=["chat", "tab", "nav", "bid", "infeas"], # define a subset of action space
            # subsets=["chat", "bid", "coord", "infeas"], # allow the agent to also use x, y coordinates
            strict=False, # less strict on the parsing of the actions
            multiaction=False, # does not enable the agent to take multiple actions at once
            demo_mode=demo_mode, # add visual effects
        )

        self.action_history = []

    def _create_browser_graph(self):
        workflow = StateGraph(BrowserState)

        # add nodes
        workflow.add_node("context_builder", self._context_builder)
        workflow.add_node("predict_action", self._predict_action)

        # add edges
        workflow.add_edge(START, "context_builder")
        workflow.add_edge("context_builder", "predict_action")
        workflow.add_edge("predict_action", END)

        # compile 
        graph = workflow.compile()

        return graph
    
    def _context_builder(self, state: BrowserState) -> BrowserState:
        """NOTE: disabled `screenshot` option from the MessageState/ BrowserState."""
        
        # print("="*50)
        # print(state)
        # print("="*50)
        system_msgs = []
        user_msgs = []

        # system instructions
        if self.chat_mode:
            system_content = f"""\
# Instructions

You are a UI Assistant, your goal is to help the user perform tasks using a web browser. You can
communicate with the user via a chat, to which the user gives you instructions and to which you
can send back messages. You have access to a web browser that both you and the user can see,
and with which only you can interact via specific commands.

Review the instructions from the user, the current state of the page and all other information
to find the best possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions.
"""
        else:
            system_content = f"""\
# Instructions

Review the current state of the page and all other information to find the best
possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions.
"""
        system_msgs.append(SystemMessage(content=system_content))
    
        # add chat messages or goal based mode
        if self.chat_mode and state.chat_messages:
            pass # chat_mode is set to False (TODO: complete this later)
        elif state["goal_object"]:
            goal_content = f"""\
# Goal
"""
            for item in state["goal_object"]:
                if item["type"] == "text":
                    goal_content += f"""\
{item["text"]}
"""
            user_msgs.append(HumanMessage(content=goal_content))

        # Add other context (tabs, axtree, html, etc.)
        tabs_content = f"""\
# Currently open tabs
"""
        for idx, (url, title) in enumerate(zip(state["open_pages_urls"], state["open_pages_titles"])):
            tabs_content += f"""\
Tab {idx}{'(active tab)' if idx == state["active_page_index"] else ''}
"""
            tabs_content += f"""\
Title: {title}\n  URL: {url}
"""
        user_msgs.append(HumanMessage(content=tabs_content)) 

        # append page AXTree (if asked)
        if self.use_axtree:
            user_msgs.append(HumanMessage(content=f"""\
# Current page Accessibility Tree

{state["axtree_txt"]}

"""))
        # append page HTML (if asked)
        if self.use_html:
            user_msgs.append(HumanMessage(content=f"""\
# Current page DOM

{state["pruned_html"]}

"""))
        # append page screenshot (if asked)
        if self.use_screenshot and state["screenshot"] is not None:
            user_msgs.append(HumanMessage(content=[
                {
                    "type": "text",
                    "text": f"""\
    # Current page Screenshot
    """
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": image_to_jpg_base64_url(state["screenshot"]),
                        "detail": "auto"
                    }
                }
            ]))

        # append action space description
        user_msgs.append(HumanMessage(content=f"""\
# Action Space

{self.action_set.describe(with_long_description=False, with_examples=True)}

Here are examples of actions with chain-of-thought reasoning:

I now need to click on the Submit button to send the form. I will use the click action on the button, which has bid 12.
```click("12")```

I found the information requested by the user, I will send it to the chat.
```send_msg_to_user("The price for a 15\\" laptop is 1499 USD.")```

"""))

        # append past actions (and last error message) if any
        if self.action_history:
            action_history_content = f"""\
# History of past actions
"""
            for action in self.action_history:
                action_history_content += f"""\
{action}
"""
            user_msgs.append(HumanMessage(content=action_history_content))

            if state["last_action_error"]:
                user_msgs.append(HumanMessage(content=f"""\
# Error message from last action

{state["last_action_error"]}

"""))
        return {"messages": system_msgs + user_msgs}

    def _predict_action(self, state: BrowserState) -> BrowserState:
        # print("="*50)
        # print(state)
        # print("="*50)
        llm = ChatOpenAI(model=self.model_name)
        response = llm.invoke(state["messages"])
        return {"messages": [response]} 
    
    def get_action(self, obs: dict) -> tuple[str, dict]:

        # initialize BrowserState with obs 
        initial_state = BrowserState(
            messages=[],# required by MessageState,
            chat_messages=obs["chat_messages"],
            screenshot=None,
            goal_object=obs["goal_object"],
            last_action=obs["last_action"],
            last_action_error=obs["last_action_error"],
            open_pages_urls=obs["open_pages_urls"],
            open_pages_titles=obs["open_pages_titles"],
            active_page_index=obs["active_page_index"],
            axtree_txt=obs["axtree_txt"],
            pruned_html=obs["pruned_html"],
        )

        # create and run the graph
        browsergym_graph = self._create_browser_graph()
        display(IPythonImage(browsergym_graph.get_graph().draw_mermaid_png()))
        response = browsergym_graph.invoke(initial_state)

        full_prompt_txt = "".join([msg.pretty_repr() for msg in response["messages"][:-1]])
        logger.info(full_prompt_txt)

        # get the predicted action
        action = response["messages"][-1].content
        
        # update action history
        self.action_history.append(action)

        return action, {}
    
@dataclasses.dataclass
class DemoAgentArgs(AbstractAgentArgs):
    """
    This class is meant to store the arguments that define the agent. 

    By isolating them in a dataclass, this ensures serialization without storing
    internal states of the agent.
    """

    model_name: str = "gpt-4o-mini"
    chat_mode: bool = False
    demo_mode: str = "off"
    use_html: bool = False
    use_axtree: bool = True
    use_screenshot: bool = False

    def make_agent(self):
        return DemoAgent(
            model_name=self.model_name,
            chat_model=self.chat_mode,
            demo_mode=self.demo_mode,
            use_html=self.use_html,
            use_axtree=self.use_axtree,
            use_screenshot=self.use_screenshot
        )