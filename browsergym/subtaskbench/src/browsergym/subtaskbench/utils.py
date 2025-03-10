import subprocess
import asyncio
from typing import Optional, Tuple


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
    process = subprocess.Popen(command, shell=True, start_new_session=True)
    
    if timeout_sec is None:
        return None, process
        
    try:
        await asyncio.sleep(timeout_sec)
        process.kill()
        return None, None
    except asyncio.CancelledError:
        process.kill()
        raise