# Running in Docker

Download Docker for your system [here](https://docs.docker.com/get-docker/). 

NOTE: After installation, make sure Docker daemon is up and running on your system before proceeding.

## Clone the Blawx Repository

`git clone -b dev https://github.com/Blawx/blawx blawx`

Omit `-b dev` if you want to use the current master version.

Go into the repository folder:
`cd blawx`

## Set the HostName

If you are not installing locally, edit the Dockerfile to replace `localhost` with the hostname for your site.

## Build from Dockerfile

`docker build -t blawx .`

## Run container

This will run the container in detached mode:

`docker run -d -p 8080:80 blawx`

NOTE: If there is another service running at port 8080 of your host machine, change 8080 to an open port.
And if you are deploying live, change the port forwarding as required.

## Try Blawx!

Navigate to http://localhost:8080/blawx.html to try out Blawx.

