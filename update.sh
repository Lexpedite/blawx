#!/bin/bash
# The command for building images for uploading to Docker Hub is this...
# docker build -t lexpedite/blawx:1.6.17-a -t lexpedite/blawx:latest .
#docker stop "$(docker ps -qf "ancestor=blawx")"
docker build -t blawx .
docker run -it -p 8000:8000 blawx