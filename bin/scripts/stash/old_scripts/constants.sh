#!/bin/zsh

localhost=1                     # 0 is 193.219.91.103, else is localhost
if (( $localhost == 0 )); then
    address="193.219.91.103"
else
    address="localhost"
fi

server_port="5001"              # Set manually
