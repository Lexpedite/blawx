# Install Blawx

The recommended method of installing and running Blawx is with Docker.

## Install Docker

Install Docker for the platform you are using.

## Clone Blawx

Using git, clone this repository to your local machine.
```
git clone https://github.com/Lexpedite/blawx blawx
```

## Build and Run Blawx

Build the blawx image with the following commands
```
cd blawx
./update.sh
```

This command will take several minutes to run the first time.

The Blawx server will now be available at [http://127.0.0.1:8000](http://127.0.0.1:8000),
and the administrative console will be available at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).

You can log into the admin console using the username "admin" and the password "blawx2022", which should be
changed immediately on logging in. A demo account with username "demo" and password "blawx2022" is also created,
and should be deleted in the admin interface if you want to restrict access to your server.

## Updating Blawx

Blawx is under active development. In order to run the most recent version of Blawx, go to the directory
in which you installed it, and run these commands:

```
git pull
./update.sh
```

Occasionally, there are changes made to Blawx that require a fresh install of other dependencies.
Whenever that is the case, it will be mentioned in the [changelog](CHANGELOG.md). If a full
re-install is required, then you should instead perform these steps:

```
git pull
docker stop $(docker ps -qf "ancestor=blawx")
docker build --no-cache -t blawx .
./update.sh
```
