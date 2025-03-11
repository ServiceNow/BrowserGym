import subprocess
import asyncio
from typing import Optional, Tuple
import shlex
import tempfile
import os
from browsergym.subtaskbench.config.config import get_config
from pathlib import Path

async def run_command_async(command: str, timeout_sec: Optional[int] = None) -> Tuple[Optional[int], Optional[subprocess.Popen]]:
    """
    Run a command asynchronously and optionally with a timeout.
    
    Args:
        command: The shell command to run
        timeout_sec: Optional timeout in seconds. If None, command runs indefinitely.
        
    Returns:
        Tuple of (return_code, process). If timeout is None, return_code will be None.
        If timeout occurs, process will be None.
    """
    process = subprocess.Popen(
        command,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        start_new_session=True
    )
    
    # Start an async task to read output
    async def read_output():
        while True:
            line = process.stdout.readline()
            if not line:
                break
            print(line.strip())
            
    asyncio.create_task(read_output())
    
    if timeout_sec is None:
        return None, process
        
    try:
        await asyncio.sleep(timeout_sec)
        process.kill()
        return None, None
    except asyncio.CancelledError:
        process.kill()
        raise

class WebReplayServerSessionHandler:
    def __init__(self, task_id: str, port: int = 8000) -> None:
        self.task_id = task_id
        self.port = port
        self.task_config = None
        self.task_start_url = None
        self.replay_config_path = None
        self.timeout = 60000
        self.parent_dir = Path(__file__).parent

    def setup_webreplay_server(self, task_id: str) -> None:
        """
        Setup the webreplay server with the given replay configuration path and port.
        """

        # Load configuration using the config module
        all_configs = get_config('subtaskbench.json')
        for config in all_configs:
            if config['task_id'] == task_id:
                self.task_config = config

        if not self.task_config:
            raise ValueError(f"Task ID {task_id} not found in config file.")
        print(self.task_config)

    
        # Create a temporary file with the replay configuration
        self.f = open(os.path.join(self.parent_dir, 'tmpfile.txtpb'), mode="w+")
        self.f.write(f"""# proto-file: protos/pb/v1alpha1/orbot_replay.proto
# proto-message: Replay

env {{
    warc_file_path: "{os.path.join(self.parent_dir, self.task_config['env']['warc_file_path'])}",
    start_url: "{self.task_config['env']['start_url']}"
}}""")
        self.replay_config_path = self.f.name

        self.f.close()
        print('This is the temp file: ', self.f.name)

        self._start_server()

    def _start_server(self):
        """Start the webreplay server in the background."""
        
        print(f"Current directory: {self.parent_dir}")
        command = f'cd {self.parent_dir}/package/ && pwd && ./webreplay.js serve_standalone {self.replay_config_path}'
        
        # Start the process directly without asyncio
        self.server_process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            start_new_session=True
        )
        
        # Start a thread to read and print output
        import threading
        def read_output():
            while True:
                line = self.server_process.stdout.readline()
                if not line:
                    break
                print(line.strip())
                
        threading.Thread(target=read_output, daemon=True).start()

    def cleanup(self):
        """Cleanup when the task is destroyed."""
        if self.server_process:
            self.server_process.kill()
        if hasattr(self, 'f'):
            os.remove(self.f.name)