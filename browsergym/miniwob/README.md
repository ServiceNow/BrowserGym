# Miniwob benchmark for BrowserGym

This package provides `browsergym.miniwob`, which is an unofficial port of the [MiniWoB++](https://miniwob.farama.org/) benchmark for BrowserGym.

## Setup

### Option 1: Automated setup (Recommended)

If you're working from the BrowserGym root directory, you can use the Makefile for automated setup:

```sh
make setup-miniwob
```

This will:

- Clone the MiniWoB++ repository
- Reset to the specific commit for reproducibility  
- Add the `MINIWOB_URL` to your `.env` file

Then load the environment variables:

```sh
source .env
```

### Option 2: Manual setup

1. Install the package

```sh
pip install browsergym-miniwob
```

1. Clone miniwob (use a specific frozen commit for reproducibility)

```sh
git clone git@github.com:Farama-Foundation/miniwob-plusplus.git
git -C "./miniwob-plusplus" reset --hard 7fd85d71a4b60325c6585396ec4f48377d049838
```

1. Setup Miniwob URL (change `PATH_TO_MINIWOB_CLONED_REPO` here to the absolute path to your `miniwob-plusplus` folder)

```sh
export MINIWOB_URL="file://<PATH_TO_MINIWOB_CLONED_REPO>/miniwob/html/miniwob/"
```

Alternatively, one can [setup a simple HTTP server](https://miniwob.farama.org/content/viewing/) and use a proper URL.
