Usage
=====

.. _installation:

Installation
------------

To use BrowserGym, first install it using pip:

.. code-block:: console

   (.venv) $ pip install browsergym

Then, a required step is to setup playwright by running

.. code-block:: console

   (.venv) $ playwright install
  
Example code
------------

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
