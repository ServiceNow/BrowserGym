WorkArena
^^^^^^^^^

`BrowserGym` integrates `WebArena` enviroment. For more information about this enviroment, please refer to the `WorkArena <https://github.com/ServiceNow/WorkArena>`_ official documentation.


BrowserGym API 
""""""""""""""

.. currentmodule:: browsergym

.. autosummary::
   :recursive:
   :toctree: generated
   :caption: WorkArena

   workarena


Usage 
"""""

**Create a ServiceNow Developer Instance**

* Go to https://developer.servicenow.com/ and create an account.

* Click on Request an instance and select the Washington release (initializing the instance will take a few minutes)

* Once the instance is ready, you should see your instance URL and credentials. If not, click Return to the Developer Portal, then navigate to Manage instance password and click Reset instance password.

* You should now see your URL and credentials. Based on this information, set the following environment variables:

   * SNOW_INSTANCE_URL: The URL of your ServiceNow developer instance

   * SNOW_INSTANCE_UNAME: The username, should be "admin"

   * SNOW_INSTANCE_PWD: The password, make sure you place the value in quotes "" and be mindful of escaping special shell characters. Running echo $SNOW_INSTANCE_PWD should print the correct password.

* Log into your instance via a browser using the admin credentials. Close any popup that appears on the main screen (e.g., agreeing to analytics).


**Install WorkArena and Initialize your Instance**

Run the following command to install WorkArena in the BrowswerGym environment:

.. code:: bash 
   
   pip install browsergym-workarena


Then, run this command in a terminal to upload the benchmark data to your ServiceNow instance:

.. code:: bash 
   
   workarena-install


Finally, install Playwright:

.. code:: bash 
   
   playwright install


Your installation is now complete! 🎉

**Run a task from the benchmark suite**

.. code-block:: python

    import gym
    import browsergym.workarena

    env = gym.make('browsergym/workarena.servicenow.filter-asset-list')
    obs, info = env.reset()
    done = False

    while not done:
        action = "noop()"
        obs, reward, terminated, truncated, info = env.step(action)
        print(f"Reward: {reward}, Done: {done}, Info: {info}")
    
    env.close()
