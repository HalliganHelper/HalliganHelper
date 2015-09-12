#! /usr/bin/env bash

sudo apt-get install python-pip -y
sudo pip install virtualenvwrapper
sudo mkdir -p /src/.virtualenvs
echo "export WORKON_HOME=$HOME/.virtualenvs" >> ~/.bashrc
echo "export PROJECT_HOME=/src" >> ~/.bashrc
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc
source /usr/local/bin/virtualenvwrapper.sh
