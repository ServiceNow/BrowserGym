import json
import logging
import os
import pathlib
import time

logger = logging.getLogger(__name__)


def add_prediction_to_jsonl(
    file_path: str, task_id: str, prediction: object, override_if_exists: bool
) -> None:
    """
    WARNING: this is not multiprocessing-safe.
    """

    # Check lock file
    lock_file_path = pathlib.Path(file_path).with_suffix(".lock")
    if os.path.exists(lock_file_path):
        while os.path.exists(lock_file_path):
            try:
                fd = os.open(lock_file_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                with os.fdopen(fd, "w") as f:
                    f.write("lock")
            except FileExistsError:
                time.sleep(0.1)
                logger.info(f"Waiting for lock file to be released: {lock_file_path}")
                continue
            break
    else:
        with open(lock_file_path, "w") as f:
            f.write("lock")
    logger.info(f"Lock file created: {lock_file_path}")
    # Check if the file exists, if not, create it
    if not os.path.exists(file_path):
        with open(file_path, "w") as f:
            pass  # Create an empty file

    # Load existing data
    data = []
    with open(file_path, "r") as f:
        for line in f:
            if line.strip():  # Ensure no empty lines
                data.append(json.loads(line))

    # Check if task_id already exists
    existing_record = next((entry for entry in data if entry["id"] == task_id), None)

    if existing_record:
        if not override_if_exists:
            logger.warning(
                f"Task ID '{task_id}' already exists. Not overriding as 'override_if_exists' is set to False."
            )
            return
        else:
            logger.warning(
                f"Task ID '{task_id}' already exists. Overriding as 'override_if_exists' is set to True."
            )
            existing_record["answer"] = prediction
    else:
        # Add new record
        data.append({"id": task_id, "answer": prediction})

    # Write updated data back to the file
    with open(file_path, "w") as f:
        for entry in data:
            f.write(json.dumps(entry) + "\n")

    # Remove lock file
    os.remove(lock_file_path)
    logger.info(f"Lock file removed: {lock_file_path}")
