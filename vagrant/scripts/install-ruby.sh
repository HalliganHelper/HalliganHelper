#!/usr/bin/env bash

 source $HOME/.rvm/scripts/rvm

 rvm use --default --install $1

 shift

 if (( $# ))
 then rvm @global do gem install $@
 fi

 rvm cleanup all
