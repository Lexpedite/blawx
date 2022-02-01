# Install Blawx

This document is a WIP as we work on streamlining the installation process.

## Notes for Installation Process

* Install django.
* Add the Blawx app code.
* Install the non-python components (swipl,sCASP)
* Configure the super-user account.

* Run the server


Python requirements are in the requirements.txt
To run the reasoner,
```
apt-add-repository --yes ppa:swi-prolog/stable
apt-get update
apt-get install swi-prolog
git clone https://github.com/JanWielemaker/sCASP.git
cd sCASP && swipl -g "pack_install('.',[interactive(false)])" -t halt
```