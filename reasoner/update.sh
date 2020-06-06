docker cp ./interface/* $(docker ps -qf "ancestor=blawx"):/var/www/html
docker cp ./reasoner/reasoner.php $(docker ps -qf "ancestor=blawx"):/usr/lib/cgi-bin
docker cp ./reasoner/decode.js $(docker ps -qf "ancestor=blawx"):/var/www/html
docker cp ./reasoner/json2f2.py $(docker ps -qf "ancestor=blawx"):/var/www/html