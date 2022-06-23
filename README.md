# Alementai
## Alementai Honeypot visualizer and management system
This is the repository for the Alementai project.

## What is Alementai HVMS
We're doing a web and SSH based system to observe statistics of and manage portspoofing clients.

## Features
- Website:
    - Display of currently running honeypots with limited management functionality
    - Display of attackers
- Virtual machine:
    - Allows semi-automatically launching virtual machines with everything needed for a basic cowrie instance.
    - Automatically gathers data once a day using cron jobs and stores it in a Postgres database.

## Requirements
The fundamental scripts and servers are meant to be stored in a single virtual machine. Here are the requirements for it:
- Node 14.19
- NPM 6.14
- Ansible
- zsh
- Postgres database

The application is not meant to be accessed through the Worldwide web, therefore has no login functionality. We recommend setting up a firewall to avoid sharing information with malicious actors.

## Instructions
### Initial setup
Once all requirements are met, you should set up the Postgres database. If using psql, copy the text from server/database.sql into the psql terminal.

After that, create server/db.js using server/db.js.example and modify it with your favourite editor.
```
$ cp db.js.example db.js
$ nano db.js
```
If you want the gathering scripts to run automatically, set up a cron tab. The recommended time is any day at 23:58 UTC (2:58 EEST). For better stability, it's better to use once a day.
```
$ crontab -e

58 2 0 0 0 $ALEMENTAI_REPO/bin/scripts/ansible/ask_for_data.yml
```
### Run the servers
While in the server folder, install the packages and start the backend.
```
$ npm i
$ node index.js
```
Run the task in the background, or open up a separate terminal window. Then in the frontend folder install packages and run the frontend.
```
$ npm i
$ npm start
```

### Create a honeypot VM
Change directory to the script folder, run the honeypot management script, then enter 4 when requested. Follow the other instructions using your OpenNebula data. If you get an error, press Ctrl+C (SIGINT), deal with the problem (check your password, delete some VMs, ...), and try again.
```
$ cd $ALEMENTAI_REPO/bin/scripts/
$ ./manage_honeypot.sh
```
When the script finishes, it will print out a wide line, then some instructions.

Type in the `ssh user@address` combo that will get printed, type in yes, then your OpenNebula admin password. switch the user to root, enter the password again and copy the final command to the terminal. Ansible will now be able to access your VM.

### Set up the honeypot and launch it
You can configure the Cowrie honeypot by editing `./remote/cowrie.cfg`. Once Ansible can access your VMs, run the following script with the IP of the new virtual machine(s) to install the configuration and launch Cowrie on the virtual machine.
```
$ ansible-playbook ansible/create_honeypot.yml -l $MANAGEMENT_IP
```

### How attackers will access it
If the attacker connects using information that you get from `SELECT h_ip, h_port FROM honeypots;`, they will connect to the honeypot. By default, they can log in using any password as long as they try to connect as root.

## Files of interest
- server/index.js - the backend of the project. It's recommended to have it running all the time.
- server/database.sql - the SQL queries to populate the database.
- server/db.js - the vault for database information
- frontend/ - the frontend of the project. 
- bin/scripts/ - the general folder for scripts:
    - ./manage_honeypot.sh - the shell script that redirects the user to management functions.
    - ./ansible/ask_for_data.yml - the playbook that gathers information from the Ansible inventory