#!/bin/zsh
username=mif71647
address=10.0.0.179
scp "$username"@"$address":/home/cowrie/cowrie/var/log/cowrie/cowrie.json .
ssh "$username"@"$address" mv /home/cowrie/cowrie/var/log/cowrie/cowrie.json /home/cowrie/cowrie/var/log/cowrie/cowrie.json.backup
rm -f .reserve.json
./src/get_attackers.sh
./src/get_sessions.sh
./src/get_auths.sh
./src/get_commands.sh
