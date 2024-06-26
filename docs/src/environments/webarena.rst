WebArena
^^^^^^^^

`BrowserGym` integrates `WebArena` enviroment. For more information about this enviroment, please refer to the `WebArena <https://webarena.dev/>`_ official documentation.


BrowserGym API  
""""""""""""""

.. currentmodule:: browsergym

.. autosummary::
   :recursive:
   :toctree: generated
   :caption: WebArena

   webarena


Usage 
"""""

Before running the sample code, install `WebArena` by following the steps in the `docs <https://github.com/ServiceNow/BrowserGym/blob/main/webarena/README.md>`_.

.. code-block:: python

    import gym
    import browsergym.webarena

    env = gym.make('browsergym/webarena.10')
    obs, info = env.reset()
    done = False

    while not done:
        action = "noop()"
        obs, reward, terminated, truncated, info = env.step(action)
        print(f"Reward: {reward}, Done: {done}, Info: {info}")
    
    env.close()

