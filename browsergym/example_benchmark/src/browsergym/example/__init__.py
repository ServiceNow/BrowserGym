import os

from browsergym.core.registration import register_task

from . import example_task

ALL_TASKS = [
    example_task.WikipediaTask,
    example_task.AmazonTask,
]


# register the benchmark tasks
for task in ALL_TASKS:
    register_task(
        task.get_task_id(),
        task,
        task_kwargs={
            "seed": 0,
            "start_url": os.getenv("START_URL", "https://google.com"),
        },
    )

# register_tasks will expose the tasks through gym
# tasks will be importable with:
# import gym
# import browsergym.example_benchmark
# env = gym.make("browsergym/example.wikipedia")
# env = gym.make("browsergym/example.amazon")
