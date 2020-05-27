# Running in Docker

Download Docker for your system [here](https://docs.docker.com/get-docker/). 

NOTE: After installation, make sure Docker daemon is up and running on your system before proceeding.

## Build from Dockerfile

`docker build -t blawx .`

## Run container

This will run the container in detached mode:

`docker run -d -p 8080:80 blawx`

NOTE: If there is another service running at port 8080 of your host machine, change 8080 to an open port.

## Try Blawx!

Navigate to http://localhost:8080/blawx.html to try out Blawx.

