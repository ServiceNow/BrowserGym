Walkthrough
___________


Boilerplate code to run an agent on an interactive, open-ended task:

.. code-block:: python

   import gymnasium as gym
   import browsergym.core  # register the openended task as a gym environment

   env = gym.make(
       "browsergym/openended", task_kwargs={"start_url": "https://www.google.com/"}, wait_for_user_message=True
   )

   obs, info = env.reset()
   done = False
   while not done:
       action = ...  # implement your agent here
       obs, reward, terminated, truncated, info = env.step(action)
       done = terminated or truncated