import tempfile
import time
import logging

logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

from browsergym.experiments.watchdog import WatchdogProcess, Pokable


def test_watchdog_no_timeout():
    """Test if the Watchdog does not raise an error when poked in time."""

    def func(poke_me: Pokable):
        logger.debug("starting my func")
        for _ in range(5):
            time.sleep(0.5)
            poke_me.poke()
        logger.debug("finished my func")

    with tempfile.TemporaryDirectory() as tmp_dir:
        watchdog = WatchdogProcess(timeout=2, dir_path=tmp_dir)
        watchdog.run(func)
        logger.debug("done running")


def test_catch_two_sigint():

    def func(poke_me: Pokable):
        try:
            time.sleep(20)
            poke_me.info = "finished normally"
            logger.debug("finished normally")

        except KeyboardInterrupt:
            poke_me.info = "Caught KeyboardInterrupt"
            logger.debug("Caught KeyboardInterrupt")

        try:
            time.sleep(20)
            poke_me.info = "finished normally"
            logger.debug("finished normally")

        except KeyboardInterrupt:
            poke_me.info = "Caught KeyboardInterrupt"
            logger.debug("Caught KeyboardInterrupt")

    with tempfile.TemporaryDirectory() as tmp_dir:
        watchdog = WatchdogProcess(timeout=2, dir_path=tmp_dir)
        watchdog.run(func)
        logger.debug("done running")
        assert watchdog.poke_me.info == "Caught KeyboardInterrupt"


def test_assert_kill():

    def func(poke_me: Pokable):
        while True:
            try:
                time.sleep(20)
                poke_me.info = "finished normally"
                logger.debug("finished normally")

            except KeyboardInterrupt:
                poke_me.info = "Caught KeyboardInterrupt"
                logger.debug("Caught KeyboardInterrupt")

    with tempfile.TemporaryDirectory() as tmp_dir:
        watchdog = WatchdogProcess(timeout=2, dir_path=tmp_dir)
        watchdog.run(func)
        logger.debug("done running")
        assert watchdog.poke_me.info == "Caught KeyboardInterrupt"


if __name__ == "__main__":
    test_catch_two_sigint()
    test_watchdog_no_timeout()
    test_assert_kill()
