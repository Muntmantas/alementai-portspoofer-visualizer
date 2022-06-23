#!/bin/zsh
SSHDIR=/home/alementai/.ssh/id_rsa.pub
echo Enter the honeypot name
read name
echo Enter the honeypot IP
read h_ip; if [[ -z $h_ip ]]; then h_ip=193.219.91.103 fi
echo Enter the honeypot port
read h_port
echo Enter the path of logs
read log_path; if [[ -z $log_path ]]; then log_path=/home/cowrie/cowrie/var/log/cowrie fi
while [[ -z $mng_ip ]]; do
    echo Enter the management IP
    read mng_ip
done
echo Enter the management port
read mng_port; if [[ -z $mng_port ]]; then mng_port=22 fi
mng_ssh_key="$(<$SSHDIR)"
echo Enter the fetch timer
read fetch_timer; if [[ -z $fetch_timer ]]; then fetch_timer=24h fi
echo "$h_ip:$h_port at $log_path is managed using $mng_ip:$mng_port every $fetch_timer"
echo SSH key: $mng_ssh_key
echo "INSERT INTO honeypots(name, h_ip, h_port, log_path, mng_ip, mng_port, mng_ssh_key, fetch_timer) VALUES('$name','$h_ip', '$h_port', '$log_path', '$mng_ip', '$mng_port', '$mng_ssh_key', '$fetch_timer');" | psql -d alementai
[[ -z $(grep $mng_ip $ANSIBLE_INVENTORY) ]] && echo $mng_ip >> $ANSIBLE_INVENTORY