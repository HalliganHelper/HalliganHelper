#!/usr/bin/env bash
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install build-essential libssl-dev nodejs npm -y
sudo apt-get install -y nodejs
# sudo ln -s "$(which nodejs)" /usr/bin/node

sudo npm install -g yuglify
