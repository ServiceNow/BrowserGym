# Get Miniwob tasks
from pathlib import Path
import pandas as pd

from browsergym.workarena import ALL_WORKARENA_TASKS
from browsergym.webarena import ALL_WEBARENA_TASK_IDS

workarena_tasks = [task_class.get_task_id() for task_class in ALL_WORKARENA_TASKS]
webarena_tasks = ALL_WEBARENA_TASK_IDS

df = pd.read_csv(Path(__file__).parent / "miniwob_tasks_all.csv")
# append miniwob. to task_name column
df["task_name"] = "miniwob." + df["task_name"]
miniwob_all = df["task_name"].tolist()
tasks_eval = df[df["miniwob_category"].isin(["original", "additional", "hidden test"])][
    "task_name"
].tolist()
miniwob_debug = df[df["miniwob_category"].isin(["debug"])]["task_name"].tolist()
miniwob_tiny_test = ["miniwob.click-dialog", "miniwob.click-dialog-2"]

assert len(miniwob_all) == 125
assert len(tasks_eval) == 107
assert len(miniwob_debug) == 12
assert len(miniwob_tiny_test) == 2


# the best agent is able to solve these tasks some of the time but often fails
edge_tasks = [
    "miniwob.choose-date",
    "miniwob.click-scroll-list",
    "miniwob.count-shape",
    "miniwob.daily-calendar",
    "miniwob.drag-cube",
    "miniwob.drag-shapes",
    "miniwob.draw-line",
    "miniwob.email-inbox-forward",
    "miniwob.email-inbox-forward-nl",
    "miniwob.email-inbox-forward-nl-turk",
    "miniwob.form-sequence",
    "miniwob.form-sequence-2",
    "miniwob.hot-cold",
    "miniwob.resize-textarea",
    "miniwob.right-angle",
    "miniwob.sign-agreement",
    "miniwob.text-editor",
    "miniwob.use-slider-2",
    "miniwob.bisect-angle",
    "miniwob.choose-date-medium",
    "miniwob.choose-date-nodelay",
]

webgum_tasks = [
    "miniwob.book-flight",
    "miniwob.choose-date",
    "miniwob.choose-date-easy",
    "miniwob.choose-date-medium",
    "miniwob.choose-list",
    "miniwob.click-button",
    "miniwob.click-button-sequence",
    "miniwob.click-checkboxes",
    "miniwob.click-checkboxes-large",
    "miniwob.click-checkboxes-soft",
    "miniwob.click-checkboxes-transfer",
    "miniwob.click-collapsible",
    "miniwob.click-collapsible-2",
    "miniwob.click-color",
    "miniwob.click-dialog",
    "miniwob.click-dialog-2",
    "miniwob.click-link",
    "miniwob.click-menu",
    "miniwob.click-option",
    "miniwob.click-pie",
    "miniwob.click-scroll-list",
    "miniwob.click-shades",
    "miniwob.click-shape",
    "miniwob.click-tab",
    "miniwob.click-tab-2",
    "miniwob.click-tab-2-hard",
    "miniwob.click-test",
    "miniwob.click-test-2",
    "miniwob.click-widget",
    "miniwob.count-shape",
    "miniwob.email-inbox",
    "miniwob.email-inbox-forward-nl",
    "miniwob.email-inbox-forward-nl-turk",
    "miniwob.email-inbox-nl-turk",
    "miniwob.enter-date",
    "miniwob.enter-password",
    "miniwob.enter-text",
    "miniwob.enter-text-dynamic",
    "miniwob.enter-time",
    "miniwob.focus-text",
    "miniwob.focus-text-2",
    "miniwob.grid-coordinate",
    "miniwob.guess-number",
    "miniwob.identify-shape",
    "miniwob.login-user",
    "miniwob.login-user-popup",
    "miniwob.multi-layouts",
    "miniwob.multi-orderings",
    "miniwob.navigate-tree",
    "miniwob.search-engine",
    "miniwob.social-media",
    "miniwob.social-media-all",
    "miniwob.social-media-some",
    "miniwob.tic-tac-toe",
    "miniwob.use-autocomplete",
    "miniwob.use-spinner",
]
