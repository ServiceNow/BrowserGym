from . import base

DEMO_MODE = False


def set_global_demo_mode(demo_mode: bool):
    global DEMO_MODE
    DEMO_MODE = demo_mode
