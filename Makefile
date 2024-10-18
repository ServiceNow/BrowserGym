install:
	@echo "--- 🚀 Installing project dependencies ---"
	pip install -e ./browsergym/core -e ./browsergym/miniwob -e ./browsergym/webarena -e ./browsergym/visualwebarena/ -e ./browsergym/webcanvas -e ./browsergym/experiments -e ./browsergym/
	playwright install chromium --with-deps

install-demo:
	@echo "--- 🚀 Installing demo dependencies ---"
	pip install -r demo_agent/requirements.txt
	playwright install chromium --with-deps

demo:
	@echo "--- 🚀 Running demo agent ---"
	(set -x && cd demo_agent && python run_demo.py)

test-core:
	@echo "--- 🧪 Running tests ---"
	pytest -n auto ./tests/core
