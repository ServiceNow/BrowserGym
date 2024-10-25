import re

from playwright.sync_api import Page
from .step_score import *


def get_netloc(url: str) -> str:
    """Extract the domain name, for example, extract 'zhihu' from 'zhihu.com', extract 'google' from 'www.google.com.hk' """
    url = urlparse(url)
    try:
        if url.netloc.startswith("www"):
            netloc = re.findall(".*?\.(.*?)\..*?", url.netloc)[0]
        else:
            netloc = re.findall("(.*?)\..*?", url.netloc)[0]
    except:
        netloc = ""
    return netloc


def step_evaluate(page: Page, evaluate_steps=[], input_path=None, element_value=None):
    """Evaluate step score"""
    step_score = 0
    match_result = []
    for evaluate in evaluate_steps:
        if evaluate["score"] != 1:
            match_function = evaluate["match_function"]
            if match_function == "url_exactly_match":
                score = URLEvaluator.url_exact_match(
                    page.url, evaluate["reference_answer"], evaluate["key"])
            elif match_function == "url_included_match":
                score = URLEvaluator.url_include_match(
                    page.url, evaluate["reference_answer"], evaluate["key"])
            elif match_function == "url_semantic_match":
                score = URLEvaluator.url_semantic_match(
                    page.url, evaluate["reference_answer"], evaluate["key"])

            elif match_function == "element_path_exactly_match":
                input_netloc = get_netloc(page.url)
                method = evaluate["method"]
                score = ElementEvaluator.path_exact_match(
                    input_path, evaluate["reference_answer"], method, page, input_netloc,
                    evaluate["netloc"])

            elif match_function == "element_path_included_match":
                pass

            elif match_function == "element_value_exactly_match":
                if input_path is not None and element_value is not None:
                    input_netloc = get_netloc(page.url)

                    if "path" in evaluate.keys():
                        path_score = ElementEvaluator.path_exact_match(input_path, evaluate["path"], "selector",
                                                                       page, input_netloc,
                                                                       evaluate["netloc"])
                        if path_score == 0:
                            score = 0
                        else:
                            score = ElementEvaluator.element_value_exact_match(
                                element_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                    else:
                        score = ElementEvaluator.element_value_exact_match(
                            element_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])

                else:
                    score = 0
            elif match_function == "element_value_included_match":
                if input_path is not None and element_value is not None:
                    input_netloc = get_netloc(page.url)
                    if "path" in evaluate.keys():
                        path_score = ElementEvaluator.path_exact_match(input_path, evaluate["path"], "selector",
                                                                       page, input_netloc,
                                                                       evaluate["netloc"])
                        if path_score == 0:
                            score = 0
                        else:
                            score = ElementEvaluator.element_value_include_match(
                                element_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                    else:
                        score = ElementEvaluator.element_value_include_match(
                            element_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                else:
                    score = 0
            elif match_function == "element_value_semantic_match":
                if input_path is not None and element_value is not None:
                    input_netloc = get_netloc(page.url)

                    if len(element_value) > 0:
                        if "path" in evaluate.keys():
                            path_score = ElementEvaluator.path_exact_match(input_path, evaluate["path"], "selector",
                                                                           page, input_netloc,
                                                                           evaluate["netloc"])
                            if path_score == 0:
                                # print("Path mismatch in value evaluation")
                                score = 0
                            else:
                                score = ElementEvaluator.element_value_semantic_match(
                                    element_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                        else:
                            score = ElementEvaluator.element_value_semantic_match(
                                element_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                        # print(score, "element_value_semantic_match",
                        #       element_value, "*", evaluate["reference_answer"])
                else:
                    score = 0
            elif match_function == "text_exact_match":
                pass  # TODO
            elif match_function == "text_include_match":
                pass
            elif match_function == "text_semantic_match":
                pass

            evaluate["score"] = max(evaluate["score"], score)
        if evaluate["score"] >= 1:
            match_result.append(
                {evaluate["match_function"]: evaluate["reference_answer"]})
        step_score += evaluate["score"]

    return evaluate_steps, match_result


def step_event_evaluate(page, evaluate_steps, task_events, target_value):

    def check_event_by_selector(events, selector):
        for event in events:
            if event and event["selector"] == selector:
                if event["status"]:
                    return 1, event
        return 0, None

    step_score = 0
    match_result = []
    for evaluate in evaluate_steps:
        if evaluate["score"] != 1:
            match_function = evaluate["match_function"]
            if match_function == "url_exactly_match":
                score = URLEvaluator.url_exact_match(
                    page.url, evaluate["reference_answer"], evaluate["key"])
            elif match_function == "url_included_match":
                score = URLEvaluator.url_include_match(
                    page.url, evaluate["reference_answer"], evaluate["key"])
            elif match_function == "url_semantic_match":
                score = URLEvaluator.url_semantic_match(
                    page.url, evaluate["reference_answer"], evaluate["key"])

            elif match_function == "element_path_exactly_match":
                score, event = check_event_by_selector(
                    task_events, evaluate["reference_answer"])

            elif match_function == "element_path_included_match":
                pass

            elif match_function == "element_value_exactly_match":
                input_netloc = get_netloc(page.url)
                if "path" in evaluate.keys():
                    path_score, event = check_event_by_selector(
                        task_events, evaluate["path"])
                    if path_score == 0:
                        score = 0
                    else:
                        score = ElementEvaluator.element_value_exact_match(
                            event["target_value"], evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                        print("score:",score)
                else:
                    score = ElementEvaluator.element_value_exact_match(
                        target_value, evaluate["reference_answer"], input_netloc, evaluate["netloc"])

            elif match_function == "element_value_included_match":
                input_netloc = get_netloc(page.url)
                if "path" in evaluate.keys():
                    path_score, event = check_event_by_selector(
                        task_events, evaluate["path"])
                    if path_score == 0:
                        score = 0
                    else:
                        score = ElementEvaluator.element_value_include_match(
                            event["target_value"], evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                else:
                    score = ElementEvaluator.element_value_include_match(
                        event["target_value"], evaluate["reference_answer"], input_netloc, evaluate["netloc"])

            elif match_function == "element_value_semantic_match":
                input_netloc = get_netloc(page.url)
                if "path" in evaluate.keys():
                    path_score, event = check_event_by_selector(
                        task_events, evaluate["path"])
                    if path_score == 0:
                        score = 0
                    else:
                        score = ElementEvaluator.element_value_semantic_match(
                            event["target_value"], evaluate["reference_answer"], input_netloc, evaluate["netloc"])
                else:
                    score = ElementEvaluator.element_value_semantic_match(
                        event["target_value"], evaluate["reference_answer"], input_netloc, evaluate["netloc"])

            evaluate["score"] = max(evaluate["score"], score)
        if evaluate["score"] >= 1:
            match_result.append(
                {evaluate["match_function"]: evaluate["reference_answer"]})
        step_score += evaluate["score"]

    return evaluate_steps, match_result
