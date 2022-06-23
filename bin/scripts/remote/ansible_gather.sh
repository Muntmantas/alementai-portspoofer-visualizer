#!/bin/zsh
address='10.0.1.59'
server_port=5001
source /home/cowrie/.h_id

rm -f .reserve.json

attackers() {
    fingerprints=("${(@f)"$(grep client.fingerprint cowrie.json)"}")

    for i in $fingerprints; do
    echo $i > .export_file.json
    curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadAttackers"
    cat .export_file.json >> .reserve.json
done
}

sessions() {
    success=("${(@f)"$(grep 'login.success\|login.failed\|client.fingerprint' cowrie.json | sed 's/{"eventid":/{"h_id":"'$h_id'","is_succesful":"1","eventid":/')"}")
}

auths() {
    success=("${(@f)"$(grep 'login.success' cowrie.json | sed 's/{"eventid":/{"h_id":"'$h_id'","is_succesful":"1","eventid":/')"}")
    failed=("${(@f)"$(grep 'login.failed' cowrie.json | sed 's/{"eventid":/{"h_id":"'$h_id'","is_succesful":"0","eventid":/')"}")

    for f in $failed; do
        echo $f > .export_file.json
        curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadSessions"    # Sessions
        curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadAuths"       # Authorizations
        cat .export_file.json >> .reserve.json
    done
    for s in $success; do
        echo $s > .export_file.json
        curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadSessions"    # Sessions
        curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadAuths"       # Authorizations
        cat .export_file.json >> .reserve.json
    done
}

commands() {
    inputs=("${(@f)"$(grep command.input cowrie.json)"}")

    for i in $inputs; do
        echo $i > .export_file.json
        curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadInputs"
        cat .export_file.json >> .reserve.json
    done
}

more_info() {                             
    ip=("${(@f)"$(grep 'session.connect' cowrie.json | cut -d \" -f 8)"}")
    session=("${(@f)"$(grep 'session.connect' cowrie.json | cut -d , -f 6)"}")
    for (( i=1; i<=$#ip; i++ )); do
        whois $ip[i] | grep country -im 1 | sed -E 's/[[:space:]]//g; s/[Cc]ountry:/{"country":"/; s/$/", '$session[i]'}/; s/.*\{/{/' > .export_file.json
        curl -X POST -H "Content-Type: application/json" -d @.export_file.json "http://$address:$server_port/uploadCountry"     # More details
        cat .export_file.json >> .reserve.json
    done
}


attackers
auths
commands
more_info
mv cowrie.json cowrie.backup