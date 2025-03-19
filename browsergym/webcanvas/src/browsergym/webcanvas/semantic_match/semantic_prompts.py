class BasePrompts:
    semantic_match_prompt_system = "Now you are an assistant to judge whether 2 elements are semantically same. I'll provide a judge rule and an answer.\n"\
        "If they are the same, you should return 1. If they are not related, you should return 0. "\
        "If they are related but not identical, return a decimal (two decimal places) between 0 and 1 of the degree of relevance you think.\n"\
        "For example, the judge rule is: Decide whether the place is New York. The score of \"new york\" and \"纽约\" are both 1, \"Brooklyn\" should be 0.\n"\
        "However, if the judge rule is: Decide whether the place is in New York. The score of \"new york\" and \"纽约\" and \"Brooklyn\" are all 1.\n"\
        "Another example, the judge rule is: Decide whether I'm looking for clothes. The score of \"red Clothes\" and \"green jacket\"should also be 1.\n"\
        "However, if the judge rule is: Decide whether I'm looking for red clothes. the score of \"bright red Clothing\" could be 0.85(red include bright red but they are not the same), the score of \"green Clothes\"should be 0.5(red is not green).\n"\
        "Remember, you should return a number with ``` and an explanation. Like output: ```1```, (your explanation)"  # "Remember, you should only return a number without any punctuation or explanation!"

    semantic_match_prompt_user = "You should judge by the rule below:{{semantic_method}}.\n\nmy answer is:{{input_answer}}\n"
