from browsergym.core.action.parsers import highlevel_action_parser
import re

def extract_action(text: str) -> str:
    """Extract action from a text containing both reasoning and action command.
    
    Args:
        text (str): Input text containing reasoning and action command in markdown code blocks
        
    Returns:
        str: Extracted action command
    """
    # Find content within code blocks (```...```)
    code_block_pattern = r'```(.*?)```'
    code_blocks = re.findall(code_block_pattern, text, re.DOTALL)
    
    if not code_blocks:
        return ""
    
    # Get the first code block and clean it
    action_text = code_blocks[0].strip()
    
    try:
        # Parse the action string
        function_calls = highlevel_action_parser.parse_string(action_text, parse_all=True)
        
        if function_calls:
            name, arguments = function_calls[0]
            # Format arguments as strings with proper quotes
            formatted_args = [repr(arg) for arg in arguments]
            # Reconstruct the action string
            return f"{name}({', '.join(formatted_args)})"
            
    except Exception as e:
        print(f"Error parsing action: {e}")
        
    return ""

if __name__ == "__main__":
    # Test cases
    test_cases = [
        '''The goal is to order 3 "iPad pro" devices with specific configurations from the hardware store. Currently, I am on a catalog page and I can see a link to "iPad pro". The next step is to click on the "iPad pro" link to explore the options for ordering the product.

```click('a405')```''',

        '''To order the iPad Pro with the specified configuration, I need to first select the desired color and storage options. I will start by selecting the color "Silver" for the iPad Pro.

```click('a212')```''',

        '''I need to select the storage option for the iPad Pro. The required configuration is '256 GB'. I will click on the '256 GB [add $100.00]' option, which has the bid 'a230'.

```click('a231')```''',

        '''To complete the order for 3 "iPad pro" devices with the specified configurations, I need to set the quantity to 3 and then proceed to order. I will start by selecting the quantity option.

```click('a231')```'''
    ]
    
    print("Testing action extraction:")
    print("-" * 40)
    for i, test_text in enumerate(test_cases, 1):
        action = extract_action(test_text)
        print(f"Test case {i}:")
        print(f"Input text: {test_text[:50]}...")
        print(f"Extracted action: {action}")
        print("-" * 40)