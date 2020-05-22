# Installation

The repository is in a very early state. If you need assistance with installation, open an issue in GitHub,
and the answer to your question will be added to this file, or join the Slack.

This process was tested on Windows 10 using Ubuntu 18.04 under WSL. Your mileage will vary.

## Install Apache
`sudo apt-get install apache2`

## Configure Apache
Add Lines to /etc/apache2/apache2.conf

```
ServerName localhost
AcceptFilter https none
AcceptFilter http none
```

Enable the CGI module for Apache:

```
cd /etc/apache2/mods-enabled
sudo ln -s ../mods-available/cgi.load
```

Install the PHP Module for Apache:

`sudo apt-get install libapache2-mod-php`

Update /etc/apache2/envvars with the line:

`export NODE_PATH=/usr/local/lib/node_modules`

Allow Apache2 to run Flora-2 as root by adding the following line to /etc/sudoers:
`www-data ALL=(root) NOPASSWD: /var/Flora-2/flora2/runflora`

This is a bit of a hack to deal with a permission problem I have not been able to sort out with Flora-2, yet.

## Start Apache2:
`sudo service apache2 start`

## Install Blockly:
```
cd /var/www/html
sudo git clone https://github.com/google/blockly blockly
sudo cp -r ./blockly/media ./media
```

## Install Blawx:
Note that the command below assumes you are installing from the development version.
If installing from the master branch, omit '-b dev'.
```
git clone -b dev https://github.com/Blawx/blawx blawx
cd blawx/interface
sudo cp * /var/www/html
cd ../reasoner
sudo cp reasoner.php /usr/lib/cgi-bin
sudo cp decode.js /var/www/html
sudo cp json2f2.py /var/www/html
```

At this point you should be able to access the Blawx interface at http://localhost/blawx.html, and all of the functionality
should work except for the "Run Blawx Code" command.

## Install NodeJS:
`sudo apt-get install nodejs`

## Install Node Package Manager
`sudo apt-get install npm`

## Install Blockly (Node):
```
sudo npm install -g blockly
```

## Install xmlhttprequest
`sudo npm install -g xmlhttprequest`

## Install Flora-2
Find the linux binary download for Flora-2, and place it in /var, giving it the name flora2.run, and run
`sudo sh flora2.run`

On my installation, the installation process did not complete properly, and I had to take the following steps:
Find the XSB folder created in /tmp. Go there, and then follow the instructions for making and building XSB from the XSB manual.
Copy the XSB temp folder to /var/Flora-2/XSB.
Then follow the instructions for making and building Flora-2 from the Flora-2 manual.

Created a .flora_paths file in `/var/Flora-2/flora2` containing
```
FLORADIR="/var/Flora-2/flora2"
PROLOG="/var/Flora-2/XSB/bin/xsb"
```

You should now be able to go to http://localhost/blawx.html, create code, and execute the "Run Blawx Code" command and get an answer from your server.
