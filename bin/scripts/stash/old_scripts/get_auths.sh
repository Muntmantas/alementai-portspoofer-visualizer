#!/bin/zsh
source ./constants.sh
redirection=uploadAuths

#GET Sessions
makeArray(){
    success=("${(@f)"$(grep 'login.success' *.json* | cut -d "," -f 2,3,6,7,8)"}")
	failed=("${(@f)"$(grep 'login.failed' *.json* | cut -d "," -f 2,3,6,7,8)"}")
}
makeArray
rm -f .export_file.json
printResult(){
    if [[ -n $failed[i] ]]; then
        for ((i=1; i<=${#failed}; i++)); do
            echo '{'"$failed[i]" | sed 's/}/,"is_succesful":"0"}/g' > .export_file.json
            curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/$redirection"
            cat .export_file.json >> .reserve.json
            done
    fi
    if [[ -n $success[i] ]]; then
        for ((i=1; i<=${#success}; i++)); do
            echo '{'"$success[i]" | sed 's/}/,"is_succesful":"1"}/g' > .export_file.json
            curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/$redirection"
            cat .export_file.json >> .reserve.json
            done
    fi
}
printResult