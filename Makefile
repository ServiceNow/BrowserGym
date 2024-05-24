install:
	@echo "--- 🚀 Installing project dependencies ---"
	pip install -e core/
	pip install -e miniwob/
	pip install -e webarena/

install-demo:
	@echo "--- 🚀 Installing demo dependencies ---"
	pip install demo_agent/requirements.txt

test-core:
	@echo "--- 🧪 Running tests ---"
	pytest -n auto core/