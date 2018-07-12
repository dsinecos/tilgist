#!/bin/sh

# To exit if there is an error in executing any of the following sub-commands

set -e

# Install dependencies
npm install

# Enable the following line if you have the following error 'Error: EACCES: permission denied'
# sudo npm install

# 
npm link

# Run tilgist to display instructions on how to use the CLI tool
tilgist

