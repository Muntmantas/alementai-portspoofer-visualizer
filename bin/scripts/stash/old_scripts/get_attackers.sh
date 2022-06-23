#!/bin/zsh
source ./constants.sh
redirection=uploadAttackers

#GET Users
makeArray(){
	fingerprints=("${(@f)"$(grep client.fingerprint *.json* | cut -d , -f 3,4 | sed 's/key/a_ssh_key/g')"}")
	versions=("${(@f)"$(grep client.version *.json* | cut -d , -f 2 | sed 's/version/client_version/g')"}")
}
makeArray
rm -f .export_file.json
printResult(){
	for ((i=1; i<=${#fingerprints}; i++)); do
		echo "{"$fingerprints[i]", "$versions[i]"}" > .export_file.json
		curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/$redirection"
		cat .export_file.json >> .reserve.json
		done
}
printResult