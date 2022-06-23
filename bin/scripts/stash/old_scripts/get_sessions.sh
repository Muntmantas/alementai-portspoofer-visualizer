#!/bin/zsh
source ./constants.sh
redirection=uploadSessions

#GET Sessions
makeArray(){
    allVersions=("${(@f)"$(grep 'client.fingerprint\|login.failed\|login.success' *.json*)"}")
	fingerprints=("${(@f)"$(grep 'client.fingerprint' *.json*)"}")
}
makeArray
rm -f .export_file.json
printResult(){
	f=0
	for (( v=1; v<=${#allVersions}; v++)); do
		if [[ -z "$(echo $allVersions[v] | grep client.fingerprint)" ]]; then 	# if no string containing client.fingerprint
			if [[ -n "$(echo $allVersions[v] | grep login.success)" ]]; then	# if yes string containing login.success
				is_succesful=1
				
			else
				is_succesful=0
			fi
			echo '{'"$(echo $allVersions[v] | cut -d "," -f 2,3,6,7 | sed 's/timestamp/conn_start/g;s/src_ip/a_ip/g')", \"is_succesful\":\"$is_succesful\","$(echo $fingerprints[f] | cut -d "," -f 3,10)" > .export_file.json
			curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/$redirection"
			cat .export_file.json >> .reserve.json
		else
			f=$f+1
		fi
	done
}
printResult
