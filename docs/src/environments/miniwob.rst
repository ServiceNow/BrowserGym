MiniWoB++
^^^^^^^^^

`BrowserGym` integrates `MiniWoB++` enviroment. For more information about this enviroment, please refer to the `MiniWoB+ <https://miniwob.farama.org/>`_ official documentation.


BrowserGym API 
""""""""""""""

.. currentmodule:: browsergym

.. autosummary::
   :recursive:
   :toctree: generated
   :caption: MiniWoB++

   miniwob


Usage 
"""""

Before running the sample code, install `MiniWoB++` by following the steps in the `docs <https://github.com/ServiceNow/BrowserGym/blob/main/miniwob/README.md>`_.

.. code-block:: python

    import gym
    import browsergym.minwob

    env = gym.make('browsergym/miniwob.book-flight')
    obs, info = env.reset()
    done = False

    while not done:
        action = "noop()"
        obs, reward, terminated, truncated, info = env.step(action)
        print(f"Reward: {reward}, Done: {done}, Info: {info}")
    
    env.close()

