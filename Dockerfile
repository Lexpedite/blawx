FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
	apt-get install -y \
	git \
	wget \
	apache2 \
	libapache2-mod-php \
	nodejs \
	npm && \
	npm install -g blockly xmlhttprequest

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
	echo "AcceptFilter https none" >> /etc/apache2/apache2.conf && \
	echo "AcceptFilter http none" >> /etc/apache2/apache2.conf

RUN cd /etc/apache2/mods-enabled && \
	ln -s ../mods-available/cgi.load

RUN echo "export NODE_PATH=/usr/local/lib/node_modules" >> /etc/apache2/envvars

RUN echo "www-data ALL=(root) NOPASSWD: /var/Flora-2/flora2/runflora" >> /etc/sudoers

WORKDIR /var/www/html

RUN git clone https://github.com/google/blockly blockly && \
	cp -r ./blockly/media ./media

WORKDIR /var

RUN wget -O flora2.run \
	https://sourceforge.net/projects/flora/files/FLORA-2/2.0%20%28Pyrus%20nivalis%29/flora2_Pyrus_nivalis_2_0.run/download && \
	sh flora2.run

CMD ["apachectl", "-D", "FOREGROUND"]

WORKDIR /var/www/html

COPY . ./blawx

COPY interface .

COPY reasoner/decode.js reasoner/json2f2.py ./

COPY reasoner/reasoner.php /usr/lib/cgi-bin

EXPOSE 80
