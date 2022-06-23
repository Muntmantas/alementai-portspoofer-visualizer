#!/bin/zsh
PLAYBOOK_DIR=/home/alementai/git/alementai-portspoofer-visualizer/bin/scripts/ansible
IP=
disable() {
    [[ -z $IP ]] && ansible-playbook $PLAYBOOK_DIR/ansible_off.yml || ansible-playbook $PLAYBOOK_DIR/ansible_off.yml -l $IP
    echo Disabled
}
enable() {
    [[ -z $IP ]] && ansible-playbook $PLAYBOOK_DIR/ansible_run.yml || ansible-playbook $PLAYBOOK_DIR/ansible_run.yml -l $IP
    echo Enabled
}
run_one() {
    echo Enter the desired management IP
    read IP

    echo 'Type in 1-2 to select one of these settings, anything else to exit.'
    echo '[1] Disable cowrie'
    echo '[2] Enable cowrie'
    read SELECTION
    case "$SELECTION" in
        1)
            disable;;
        2)
            enable;;
        *)
            echo Exiting;;
    esac
}
create() {
    $PLAYBOOK_DIR/../src/create_honeypot.sh
    echo "Don't forget to set it up afterwards!"
}
setup() {
    echo Enter the IP of the VM you want to set up:
    read IP
    ansible-playbook $PLAYBOOK_DIR/create_honeypot.yml -l $IP
}

echo 'Type in 1-5 to select one of these settings, anything else to exit.'
echo '[1] Disable all cowries'
echo '[2] Enable all cowries'
echo '[3] Enter IP to manage one VM'
echo '[4] Create new VM'
echo '[5] Set up the VM'
read SELECTION
case "$SELECTION" in
    1)
        disable;;
    2)
        enable;;
    3)
        run_one;;
    4) 
        create;;
    5)
        setup;;
    *)
        echo Exiting;;
esac