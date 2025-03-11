import json
from pathlib import Path
from typing import Dict, Any

STATIC_TASK_IDS = ["static." + str(task_id) for task_id in range(0)]
ONLINE_TASK_IDS = ["online." + str(task_id) for task_id in range(3)]

# Cache for loaded configurations
_config_cache: Dict[str, Dict[str, Any]] = {}

def get_config(task_config_path: str) -> Dict[str, Any]:
    """
    Load and cache configuration from a JSON file.
    
    Args:
        task_config_path: Name of the JSON config file in the config directory
        
    Returns:
        Dict containing the configuration
        
    Raises:
        FileNotFoundError: If the config file doesn't exist
        json.JSONDecodeError: If the config file is not valid JSON
    """
    if task_config_path in _config_cache:
        return _config_cache[task_config_path]
        
    config_dir = Path(__file__).parent
    config_path = config_dir / task_config_path
    
    if not config_path.exists():
        raise FileNotFoundError(f"Configuration file not found: {task_config_path}")
        
    with open(config_path, 'r') as f:
        config = json.load(f)
        
    _config_cache[task_config_path] = config
    return config
