# BrowserGym

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser. It decomposes into:
 - `browsergym.core` the core functionalities of browsergym, the gym environment, and several the action set implementations.
 - `browsergym.experiments` a suite of experimental tools to run web agents on browsergym tasks and record their traces.
 - `browsergym.utils` utility functions, mainly to postprocess browsergym observations in text format.

## Setup

Install browsergym with only core functionalities, without the benchmarks
```sh
pip install browsergym
```

Or, install browsergym with specific benchmarks
```sh
pip install browsergym[miniwob]
pip install browsergym[webarena]
pip install browsergym[workarena]
pip install browsergym[all]  # all the above
```
