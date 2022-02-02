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

RUN pip3 install -r blawx/blawx/requirements.txt

RUN git clone https://github.com/JanWielemaker/sCASP.git && \
	cd sCASP && \
	swipl -g "pack_install('.',[interactive(false)])" -t halt

RUN git clone -b v1 --single-branch https://github.com/Lexpedite/blawx blawx && \
    cd blawx/blawx/static/blawx && \
    git clone https://github.com/google/blockly blockly

WORKDIR blawx

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
