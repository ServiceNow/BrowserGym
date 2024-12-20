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

