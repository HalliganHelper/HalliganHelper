#!/usr/bin/env bash
sudo apt-get install build-essential libssl-dev -y
curl -s https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
source ~/.nvm/nvm.sh

nvm install v4
nvm use v4
nvm alias default v4
npm install -g yuglify
