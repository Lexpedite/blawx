FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
    apt-get install -y software-properties-common

RUN apt-add-repository --yes ppa:swi-prolog/stable && \
	apt-get -y update && \
	apt-get install -y \
	python3 \
	python3-pip \
	git \
	swi-prolog \
	npm

RUN pip3 install Django

RUN git clone https://github.com/JanWielemaker/sCASP.git && \
	cd sCASP && \
	git checkout 4a75bdaddbe17ad46b68f9a715d138fbddb83b78 && \
	swipl -g "pack_install('.',[interactive(false)])" -t halt


ADD ./blawx/requirements.txt blawx/blawx/requirements.txt

RUN pip3 install -r blawx/blawx/requirements.txt

ADD . blawx

# RUN npm install blockly@8.0.1

# RUN mv /node_modules/blockly /blawx/blawx/static/blawx/blockly

RUN git clone https://github.com/google/blockly --branch blockly-v8.0.2 blawx/blawx/static/blawx/blockly 

RUN cp /blawx/blawx/static/blawx/blockly/msg/js/en.js /blawx/blawx/static/blawx/en.js


RUN npm install jquery

RUN mv /node_modules/jquery/dist/jquery.min.js /blawx/blawx/static/blawx/jquery.min.js

RUN npm install bootstrap

RUN mv /node_modules/bootstrap/dist/css/bootstrap.min.css /blawx/blawx/static/blawx/bootstrap.min.css

RUN mv /node_modules/bootstrap/dist/css/bootstrap.min.css.map /blawx/blawx/static/blawx/bootstrap.min.css.map

RUN mv /node_modules/bootstrap/dist/js/bootstrap.bundle.min.js /blawx/blawx/static/blawx/bootstrap.bundle.min.js

RUN mv /node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map /blawx/blawx/static/blawx/bootstrap.bundle.min.js.map

RUN npm install bootstrap-icons

RUN mv /node_modules/bootstrap-icons/font/bootstrap-icons.css /blawx/blawx/static/blawx/bootstrap-icons.css

RUN mv /node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff /blawx/blawx/static/blawx/fonts/bootstrap-icons.woff

RUN mv /node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2 /blawx/blawx/static/blawx/fonts/bootstrap-icons.woff2



WORKDIR /blawx

ARG SU_PASSWORD=blawx2022

ENV DJANGO_SUPERUSER_PASSWORD=$SU_PASSWORD

RUN python3 manage.py migrate

RUN python3 manage.py createsuperuser --noinput --username admin --email admin@admin.com

RUN python3 load_data.py

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
