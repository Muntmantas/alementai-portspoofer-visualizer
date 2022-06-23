#!/bin/zsh
source ./constants.sh
redirection=uploadInputs

#GET Inputs
makeArray(){
	inputs=("${(@f)"$(grep command.input *.json* | cut -d , -f 2,5,7 | sed 's/timestamp/comm_time/g')"}")
}

makeArray
rm -f .export_file.json
printResult(){
	for ((i=1; i<=${#inputs}; i++)); do
		echo "{""$inputs[i]" > .export_file.json
		curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/$redirection"
		cat .export_file.json >> .reserve.json
		done
}
if [[ -n $inputs[1] ]]; then
	printResult
fi

