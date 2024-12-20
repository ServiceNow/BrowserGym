#!/bin/bash

# Default values
MODEL_NAME="gpt-4o"
TOTAL_RUNS=1
VISUAL_EFFECTS=true
USE_HTML=false
USE_AXTREE=true
USE_SCREENSHOT=false
RESULTS_DIR="./results"

# Array of task names
TASKS=(
    'workarena.servicenow.order-apple-mac-book-pro15'
    'workarena.servicenow.order-apple-watch'
    'workarena.servicenow.order-developer-laptop'
    'workarena.servicenow.order-development-laptop-p-c'
    'workarena.servicenow.order-ipad-mini'
    'workarena.servicenow.order-ipad-pro'
    'workarena.servicenow.order-loaner-laptop'
    'workarena.servicenow.order-sales-laptop'
    'workarena.servicenow.order-standard-laptop'
)

# Help function
function show_help {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -m, --model-name     Model name (default: gpt-4o)"
    echo "  -r, --runs           Total number of runs (default: 1)"
    echo "  -v, --visual         Enable visual effects (default: true)"
    echo "  -h, --html           Use HTML (default: false)"
    echo "  -a, --axtree         Use AXTree (default: true)"
    echo "  -s, --screenshot     Use screenshot (default: false)"
    echo "  --help              Show this help message"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -m|--model-name)
            MODEL_NAME="$2"
            shift 2
            ;;
        -r|--runs)
            TOTAL_RUNS="$2"
            shift 2
            ;;
        -v|--visual)
            VISUAL_EFFECTS="$2"
            shift 2
            ;;
        -h|--html)
            USE_HTML="$2"
            shift 2
            ;;
        -a|--axtree)
            USE_AXTREE="$2"
            shift 2
            ;;
        -s|--screenshot)
            USE_SCREENSHOT="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

echo "Starting experiments with following configuration:"
echo "Model name: $MODEL_NAME"
echo "Total runs: $TOTAL_RUNS"
echo "Visual effects: $VISUAL_EFFECTS"
echo "Use HTML: $USE_HTML"
echo "Use AXTree: $USE_AXTREE"
echo "Use Screenshot: $USE_SCREENSHOT"

# Function to get random task
function get_random_task {
    local idx=$((RANDOM % ${#TASKS[@]}))
    echo "${TASKS[$idx]}"
}

# Run experiments
for ((i=1; i<=$TOTAL_RUNS; i++)); do
    TASK=$(get_random_task)
    echo "Run $i/$TOTAL_RUNS: Running task $TASK"
    
    python3 demo_agent/run_demo.py \
        --task_name "$TASK" \
        --model_name "$MODEL_NAME" \
        --visual_effects "$VISUAL_EFFECTS" \
        --use_html "$USE_HTML" \
        --use_axtree "$USE_AXTREE" \
        --use_screenshot "$USE_SCREENSHOT"
    
    # Check if the run was successful
    if [ $? -ne 0 ]; then
        echo "Error in run $i with task $TASK"
    fi
done

# Generate analysis after all runs are complete
echo "Generating experiment analysis..."
python3 experiments/logging/trace_formatter.py --results_dir "$RESULTS_DIR"

echo "All experiments and analysis complete!" 

# # Basic run with default values
# ./run_experiments.sh

# # Run with specific model and number of runs
# ./run_experiments.sh --model-name "gpt-4o" --runs 5

# # Run with all options
# ./run_experiments.sh \
#     --model-name "gpt-4o" \
#     --runs 3 \
#     --visual true \
#     --html false \
#     --axtree true \
#     --screenshot false

# # Show help
# ./run_experiments.sh --help