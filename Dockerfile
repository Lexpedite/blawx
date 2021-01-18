FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
	apt-get install -y \
	sudo \
	python3 \
	python3-pip \
	git \
	wget \
	apache2 \
	libapache2-mod-php \
	nodejs \
	npm && \
	npm install -g blockly xmlhttprequest

RUN pip3 install pexpect

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
	echo "AcceptFilter https none" >> /etc/apache2/apache2.conf && \
	echo "AcceptFilter http none" >> /etc/apache2/apache2.conf

COPY reasoner/serve-cgi-bin.conf /etc/apache2/conf-available

RUN cd /etc/apache2/mods-enabled && \
	ln -s ../mods-available/cgi.load

RUN echo "export NODE_PATH=/usr/local/lib/node_modules" >> /etc/apache2/envvars

RUN echo "www-data ALL=(root) NOPASSWD: /var/Flora-2/flora2/runflora" >> /etc/sudoers

WORKDIR /var/www/html

RUN git clone https://github.com/google/blockly blockly && \
	cp -r ./blockly/media ./media

WORKDIR /var

RUN wget -O flora2.run \
	https://sourceforge.net/projects/flora/files/FLORA-2/2.1%20%28Punica%20granatum%29/flora2-2.1-RC1.run/download && \
	sh flora2.run

CMD ["apachectl", "-D", "FOREGROUND"]

WORKDIR /var/www/html

COPY . ./blawx

COPY interface .

COPY reasoner/reasoner.py /usr/lib/cgi-bin

RUN chmod +x /usr/lib/cgi-bin/reasoner.py

COPY reasoner/dateminus.flr /usr/lib/cgi-bin

COPY reasoner/demo.blawx /usr/lib/cgi-bin

COPY reasoner/demo2.blawx /usr/lib/cgi-bin

COPY reasoner/simple.blawx /usr/lib/cgi-bin

EXPOSE 80
