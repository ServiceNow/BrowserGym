install:
	@echo "--- 🚀 Installing project dependencies ---"
	pip install -e .

install-demo:
	@echo "--- 🚀 Installing demo dependencies ---"
	pip install demo_agent/requirements.txt

install-core:
	@echo "--- 🚀 Installing core dependencies ---"
	pip install -e "core/."

test-core:
	@echo "--- 🧪 Running tests ---"
	pytest -n auto core/