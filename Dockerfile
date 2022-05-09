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
	swi-prolog

RUN pip3 install Django

RUN git clone https://github.com/JanWielemaker/sCASP.git && \
	cd sCASP && \
	swipl -g "pack_install('.',[interactive(false)])" -t halt

RUN git clone https://github.com/google/blockly blawx/blawx/static/blawx/blockly

ADD ./blawx/requirements.txt blawx/blawx/requirements.txt

RUN pip3 install -r blawx/blawx/requirements.txt

ADD ./blawx/util/mqi.pl blawx/blawx/util/mqi.pl

RUN swipl -s blawx/blawx/util/mqi.pl -g "mqi:install_to_library('blawx/blawx/util/mqi.pl')" -t halt

ADD . blawx

WORKDIR blawx

RUN python3 load_data.py

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
