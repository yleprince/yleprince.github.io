# Setup Python environment


## [`pyenv`](https://github.com/pyenv/pyenv) ##

Use `pyenv` to manage properly several python installations on your desktop.


Install dependencies

```sh
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev
```

Then you can install `pyenv`

```sh
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
pyenv install 3.8.1 # Install Python version 3.8.1
```

```sh
$ pyenv versions # List all versions of Python available
$ pyenv update
$ pyenv global 3.8.1 # Select version 3.8.1 as default Python version
```


## [`pipenv`](https://github.com/pypa/pipenv) ##

`pipenv` is the equivalent of [`npm`](https://www.npmjs.com) or [`cargo`](https://github.com/rust-lang/cargo) but for python. It describes the dependencies of a project, the python version to use and manage isolated environment.

### Install ###

```console
$ pip install pipenv
```

Then you should only use pipenv to work in a clean environment. :bulb: 