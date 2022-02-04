docker stop $(docker ps -qf "ancestor=blawx")
docker build -t blawx .
docker run -d -p 8000:8000 blawx