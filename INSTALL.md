# Installation

The repository is in a very early state. If you need assistance, open an issue in GitHub,
and the answer to your question will be added to this file.

Blawx's back end requires an Apache server with PHP, Node.js, the node version of Blockly, Python 3, and Flora-2 (AKA ErgoLite).

Blawx's front end is javascript, html, and needs access to the front-end Blockly libraries.

reasoner.php should be in /usr/lib/cgi-bin
All other files should be in /var/www/html
Flora-2 is expected at /opt/Flora-2/

## Installation Process (in progress)
This process was tested on Windows 10 using Ubuntu 18.04 under WSL.
After installing WSL and Ubuntu, run the Ubuntu shell as administrator, and follow these steps.
The steps below assume that you are logged in as a non-root user.

### Install Python3

### Install Apache
`sudo apt-get apache2 install`

### Configure Apache
Add Lines to /etc/apache2/apache2.conf
```
ServerName localhost
AcceptFilter https none
AcceptFilter http none
```

### Start Apache2:
`service apache2 start`

### Install NodeJS:
`sudo apt-get install nodejs`

### Install Node Package Manager
`sudo apt-get install npm`

### Install Blockly (Node):
```
sudo npm install -g blockly
NODE_PATH=/usr/local/lib/node_modules
export NODE_PATH
```

### Install Blockly:
```
cd /var/www/html
git clone https://github.com/google/blockly blockly
sudo cp -r ./blockly/media ./media
```

### Install Blawx:
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
should work except for the Run Blawx Code command.

### Install Flora-2
```
cd /var
sudo wget "https://sourceforge.net/projects/flora/files/FLORA-2/2.0%20%28Pyrus%20nivalis%29/flora2_Pyrus_nivalis_2_0.run/download"
sudo mv download flora2.run
sudo sh flora2.run
```

### Change Permsissions for Flora-2
