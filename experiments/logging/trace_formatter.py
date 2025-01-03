from pathlib import Path
import logging
import re
from typing import Dict, List, Optional, Tuple

from pathfinder import parse_accessibility_tree, get_path_to_bid
from utils import (
    extract_action, 
    extract_datetime_from_exp_dir, 
    extract_bids_from_action,
    log_metadata
)
from templates import get_system_message_template, get_next_action_template


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Analyze BrowserGym experiment results")
    parser.add_argument("--exp_dir", type=str, help="Path to single experiment directory")
    parser.add_argument("--results_dir", type=str, default="./result", help="Path to results directory containing multiple experiments")
    parser.add_argument("--debug", action="store_true", help="Enable debug mode logging")
    
    args = parser.parse_args()
    
    if args.exp_dir:
        # Process single experiment directory
        log_experiment_details(Path(args.exp_dir), debug_mode=args.debug)
    else:
        # Process all experiment directories under results_dir
        results_dir = Path(args.results_dir)
        if not results_dir.exists():
            print(f"Error: Results directory {results_dir} does not exist")
            exit(1)
            
        # Get all subdirectories that match the datetime pattern (YYYY-MM-DD_HH-MM-SS)
        exp_dirs = [d for d in results_dir.iterdir() if d.is_dir() and 
                   re.match(r"\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}", d.name)]
        
        if not exp_dirs:
            print(f"No experiment directories found in {results_dir}")
            exit(0)
            
        print(f"Found {len(exp_dirs)} experiment directories to process")
        for exp_dir in exp_dirs:
            print(f"Processing {exp_dir.name}...")
            try:
                log_experiment_details(exp_dir, debug_mode=args.debug)
            except Exception as e:
                print(f"Error processing {exp_dir.name}: {e}")