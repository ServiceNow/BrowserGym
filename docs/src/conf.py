# Configuration file for the Sphinx documentation builder.

# -- Project information

project = "BrowserGym"
copyright = "2024, ServiceNow Research"
author = "ServiceNow Research"

version = "0.10.2"
release = version

# -- General configuration

extensions = [
    "sphinx.ext.duration",
    "sphinx.ext.doctest",
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx.ext.intersphinx",
    "sphinx_design",
]

intersphinx_mapping = {
    "python": ("https://docs.python.org/3/", None),
    "sphinx": ("https://www.sphinx-doc.org/en/master/", None),
}
intersphinx_disabled_domains = ["std"]

templates_path = ["_templates"]
fixed_sidebar = True

# -- Options for HTML output

# Automatically extract typehints when specified and place them in
# descriptions of the relevant function/method.
# autodoc_typehints = "description"

# Don't show class signature with the class' name.
# autodoc_class_signature = "separated"

html_theme = "pydata_sphinx_theme"

html_theme_options = {
    "show_nav_level": 2,
    "navigation_depth": 2,
    "show_toc_level": 2,
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/ServiceNow/BrowserGym",
            "icon": "fa-brands fa-square-github",
            "type": "fontawesome",
        }
    ],
}

# -- Options for EPUB output
epub_show_urls = "footnote"
