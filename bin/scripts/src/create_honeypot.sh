#!/bin/zsh
# Constants
CENDPOINT=https://grid5.mif.vu.lt/cloud3/RPC2
WAIT=21                                         # Not less than 6
PRIVATE_PORT=22
LOG_PATH=/home/cowrie/cowrie/var/log/cowrie
FETCH_TIMER=24h
# Manual entry
echo Enter the cloud username
read CUSER
echo Enter the cloud password
stty -echo
read CPASS
stty echo
echo Enter the VM name
read CVMNAME
#Initialization
CVMREZ=$(onetemplate instantiate "debree" --name $CVMNAME --user $CUSER --password $CPASS --endpoint $CENDPOINT)
CVMID=$(echo $CVMREZ | cut -d ' ' -f 3)
echo VM ID: $CVMID
echo Waiting $WAIT seconds...
sleep $(( $WAIT-5 ))
echo 5 seconds left...
sleep 5
# Data gathering
oneshow() onevm show $CVMID --user $CUSER --password $CPASS --endpoint $CENDPOINT   # Creates function oneshow to replace redundant text
PRIVATE_IP=$(oneshow | grep PRIVATE\_IP | sed 's/.*="//; s/"//')
echo $PRIVATE_IP >> $ANSIBLE_INVENTORY
PUBLIC_IP=$(oneshow | grep PUBLIC\_IP | sed -E 's/.*="//; s/"//')
PUBLIC_PORT="$(oneshow | grep TCP\_PORT\_F | sed 's/.*22 //; s/:2222.*//')"
SSH_KEY="$(oneshow | grep SSH\_PUBLIC\_KEY | sed 's/.*="//; s/".*//')"
ssh-keygen -f "/home/alementai/.ssh/known_hosts" -R $PRIVATE_IP
# Data printing
echo Name: $CVMNAME
echo Management IP: $PRIVATE_IP:$PRIVATE_PORT
echo Honeypot address: $PUBLIC_IP:$PUBLIC_PORT
echo "INSERT INTO honeypots (name, h_ip, h_port, mng_ip, mng_port, mng_ssh_key, log_path) VALUES 
('$CVMNAME', '$PUBLIC_IP', $PUBLIC_PORT, '$PRIVATE_IP', '$PRIVATE_PORT', '$SSH_KEY', '$LOG_PATH');" | psql
[[ -z $(grep $PRIVATE_IP $ANSIBLE_INVENTORY) ]] && echo $PRIVATE_IP >> $ANSIBLE_INVENTORY
echo "SELECT h_id FROM honeypots WHERE name='$CVMNAME' AND h_port='$PUBLIC_PORT'" | psql -t | sed -E 's/^[[:space:]]+/h_id=/' > /home/alementai/git/alementai-portspoofer-visualizer/bin/scripts/ansible/.h_id
# Manual steps
echo --------------------------------------------------------------------
echo Type in:
echo ssh $CUSER@$PRIVATE_IP
echo And paste:
echo su root
echo echo $(cat ~/.ssh/id_rsa.pub) '>> /root/.ssh/authorized_keys'
