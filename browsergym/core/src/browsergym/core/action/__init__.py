_DEMO_MODE = False


def set_global_demo_mode(demo_mode: bool):
    global _DEMO_MODE
    _DEMO_MODE = demo_mode


def get_global_demo_mode():
    global _DEMO_MODE
    return _DEMO_MODE
