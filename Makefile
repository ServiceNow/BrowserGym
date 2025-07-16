install:
	@echo "--- 🚀 Installing project dependencies ---"
	pip install -e ./browsergym/core -e ./browsergym/miniwob -e ./browsergym/webarena -e ./browsergym/visualwebarena/ -e ./browsergym/experiments -e ./browsergym/assistantbench -e ./browsergym/safearena -e ./browsergym/
	playwright install chromium

install-demo:
	@echo "--- 🚀 Installing demo dependencies ---"
	pip install -r demo_agent/requirements.txt
	playwright install chromium

demo:
	@echo "--- 🚀 Running demo agent ---"
	(set -x && cd demo_agent && python run_demo.py)

setup-miniwob:
	@echo "--- 🤖 Setting up MiniWoB++ ---"
	@if [ ! -d "miniwob-plusplus" ]; then \
		echo "Cloning MiniWoB++ repository..."; \
		git clone https://github.com/Farama-Foundation/miniwob-plusplus.git; \
	else \
		echo "MiniWoB++ repository already exists, skipping clone..."; \
	fi
	@echo "Resetting to specific commit for reproducibility..."
	git -C "./miniwob-plusplus" reset --hard 7fd85d71a4b60325c6585396ec4f48377d049838
	@echo "Adding MINIWOB_URL to .env file..."
	@echo "MINIWOB_URL=\"file://$(shell pwd)/miniwob-plusplus/miniwob/html/miniwob/\"" >> .env
	@echo "✅ MiniWoB++ setup complete!"
	@echo "💡 To use MiniWoB++, load the environment variables:"
	@echo "   source .env"

test-core:
	@echo "--- 🧪 Running tests ---"
	pytest -n auto ./tests/core

clean-miniwob:
	@echo "--- 🧹 Cleaning MiniWoB++ installation ---"
	rm -rf miniwob-plusplus
	@echo "✅ MiniWoB++ installation cleaned!"

help:
	@echo "Available targets:"
	@echo "  install          - Install project dependencies"
	@echo "  setup-miniwob    - Setup MiniWoB++ dependencies"
	@echo "  install-demo     - Install demo dependencies"
	@echo "  demo             - Run demo agent"
	@echo "  test-core        - Run core tests"
	@echo "  clean-miniwob    - Remove MiniWoB++ directory"
	@echo "  help             - Show this help message"

.PHONY: install setup-miniwob install-demo demo test-core clean-miniwob help
