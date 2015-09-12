#! /usr/bin/env bash
source /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv HalliganHelper
workon HalliganHelper
cd $HOME/HalliganHelper
pip install -r requirements.txt
