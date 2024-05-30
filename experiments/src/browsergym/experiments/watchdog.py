from ctypes import c_wchar_p
import logging
import multiprocessing
import os
from pathlib import Path
import signal
import threading
import time

logger = logging.getLogger(__name__)


class Watchdog:
    """A watchdog to stop the experiment if it doesn't respond in time."""

    def __init__(self, timeout=5):
        self._last_poke = time.time()
        self._lock = threading.Lock()
        self._stop_event = threading.Event()
        self.timeout = timeout

    def run(self, func):
        self.main_thread_id = threading.get_ident()
        self._last_poke = time.time()

        watchdog_thread = threading.Thread(target=self._watchdog)
        watchdog_thread.daemon = True

        watchdog_thread.start()

        try:
            logger.debug("Running main function")
            func(self)
            logger.debug("Main function finished")
        except KeyboardInterrupt:
            logger.debug("Main function caught KeyboardInterrupt")
        finally:
            logger.debug("Set stop event")
            self._stop_event.set()
            logger.debug("Stop event sent")
            # watchdog_thread.join()
            logger.debug("Watchdog thread joined")

    def _watchdog(self):
        # Block SIGINT signal in the watchdog thread
        signal.signal(signal.SIGINT, signal.SIG_IGN)

        while not self._stop_event.is_set():
            logger.debug("Watchdog thread running")
            time.sleep(0.5)
            with self._lock:
                alive = self._last_poke + self.timeout > time.time()
                if not alive:
                    logger.warning(
                        f"Watchdog timeout > {self.timeout} seconds, sending SIGINT to main thread"
                    )
                    try:
                        pid = os.getpid()
                        os.kill(pid, signal.SIGINT)
                        logger.debug(f"SIGINT sent to current process {pid}")
                    except Exception as e:
                        logger.error(f"Failed to send SIGINT to current process {pid}: {e}")
                    finally:
                        self.poke()

        logger.debug("Watchdog thread finished")

    def poke(self):
        with self._lock:
            self._last_poke = time.time()


class WatchdogProcess:
    """A watchdog to stop the experiment if it doesn't respond in time."""

    def __init__(self, timeout=5, dir_path=None):
        if dir_path is None:
            self.poke_me = Pokable(timeout)
        else:
            self.poke_me = PokableFile(timeout, dir_path)
        self._kill_count = 0

    def run(self, func):
        self.poke_me.poke()

        # Run the func in a new subprocess
        func_process = multiprocessing.Process(target=func, args=(self.poke_me,))
        func_process.start()

        try:
            self._watchdog(func_process)
        finally:
            logger.debug("Function process finished")
            func_process.join()
            logger.debug("Function process joined")

    def _watchdog(self, func_process: multiprocessing.Process):
        while func_process.is_alive():
            # logger.debug("Watchdog running")
            time.sleep(0.1)

            if not self.poke_me.is_alive():

                sig = signal.SIGINT
                sig_str = "SIGINT"
                if self._kill_count >= 2:
                    sig = signal.SIGKILL
                    sig_str = "SIGKILL"

                logger.warning(
                    f"Watchdog timeout > {self.poke_me.timeout} seconds, sending {sig_str} to function process (kill count: {self._kill_count})."
                )
                try:
                    os.kill(func_process.pid, sig)
                    self._kill_count += 1
                    logger.debug(f"{sig_str} sent to function process {func_process.pid}")
                except Exception as e:
                    logger.error(
                        f"Failed to send {sig_str} to function process {func_process.pid}: {e}"
                    )
                finally:
                    self.poke_me.poke()

        logger.debug("Watchdog finished")


class Pokable:

    def __init__(self, timeout):
        self.timeout = timeout
        manager = multiprocessing.Manager()
        self._last_poke = manager.Value("d", time.time())
        self._info = manager.Value(c_wchar_p, "")

    @property
    def info(self):
        return self._info.value

    @info.setter
    def info(self, value):
        self._info.value = value

    def is_alive(self):
        return self._last_poke.value + self.timeout > time.time()

    def poke(self):
        self._last_poke.value = time.time()


class PokableFile:
    def __init__(self, timeout, dir_path):
        self.timeout = timeout
        self.dir_path = Path(dir_path)
        self.poke_time_path = self.dir_path / "poke_time.txt"
        self.info_path = self.dir_path / "info.txt"

        # Ensure the directory exists
        self.dir_path.mkdir(parents=True, exist_ok=True)

        # Initialize poke_time
        self.poke()

    @property
    def info(self):
        if self.info_path.exists():
            return self.info_path.read_text()
        return ""

    @info.setter
    def info(self, value):
        self.info_path.write_text(value)

    def is_alive(self):
        if self.poke_time_path.exists():
            last_poke = float(self.poke_time_path.read_text())
            return last_poke + self.timeout > time.time()
        return False

    def poke(self):
        self.poke_time_path.write_text(str(time.time()))
