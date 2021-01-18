# update.sh
#
# Script for copying revised development blawx files into a running docker container
# using the blawx image.
#
# This script assumes that there is one running docker container on the development
# machine that uses a version of the blawx image. If there is more than one, this
# script will probably throw errors.

docker cp ./interface/. $(docker ps -qf "ancestor=blawx"):/var/www/html
docker cp ./reasoner/reasoner.php $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker cp ./reasoner/decode.js $(docker ps -qf "ancestor=blawx"):/var/www/html
docker cp ./reasoner/json2f2.py $(docker ps -qf "ancestor=blawx"):/var/www/html
docker cp ./reasoner/dateminus.flr $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker cp ./reasoner/reasoner.py $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker cp ./reasoner/demo.blawx $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker cp ./reasoner/demo2.blawx $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker cp ./reasoner/simple.blawx $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker exec $(docker ps -qf "ancestor=blawx") chmod +x /usr/lib/cgi-bin/reasoner.py