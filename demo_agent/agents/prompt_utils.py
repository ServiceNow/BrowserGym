import bs4
import re


def prune_html(html):
    html = re.sub(r"\n", " ", html)
    # remove html comments
    html = re.sub(r"<!--(.*?)-->", "", html, flags=re.MULTILINE)

    soup = bs4.BeautifulSoup(html, "lxml")
    for tag in reversed(soup.find_all()):
        # remove body and html tags (not their content)
        if tag.name in ("html", "body"):
            tag.unwrap()
        # remove useless tags
        elif tag.name in ("style", "link", "script", "br"):
            tag.decompose()
        # remove / unwrap structural tags
        elif tag.name in ("div", "span", "i", "p") and len(tag.attrs) == 1 and tag.has_attr("bid"):
            if not tag.contents:
                tag.decompose()
            else:
                tag.unwrap()

    html = soup.prettify()

    return html
