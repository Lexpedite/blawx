FROM swipl:latest as prolog

FROM python:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update

RUN pip3 install Django

RUN set -eux; \
	apt-get update; \
	apt-get install -y --no-install-recommends \
	git \
	npm \
	libtcmalloc-minimal4

WORKDIR /app

RUN set -eux; \
    wget  https://github.com/SWI-Prolog/sCASP/archive/refs/heads/master.zip ; \
	unzip master.zip; \
	mv sCASP-master sCASP; \
	rm master.zip

COPY --from=prolog /usr/lib/swipl/ /usr/lib/swipl/

RUN ln -s /usr/lib/swipl/bin/x86_64-linux/swipl /usr/local/bin/swipl

RUN set -eux; \
  cd sCASP; \
  swipl -g "pack_install('.',[interactive(false)])" -t halt

COPY ./blawx/requirements.txt blawx/blawx/requirements.txt

RUN pip3 install -r blawx/blawx/requirements.txt

RUN mkdir blawx/blawx/static

RUN mkdir blawx/blawx/static/blawx

RUN mkdir blawx/blawx/static/blawx/blockly

RUN mkdir blawx/blawx/static/blawx/fonts

# RUN git clone https://github.com/google/blockly --branch develop blawx/blawx/static/blawx/blockly 

RUN npm install blockly

RUN mv ./node_modules/blockly /app/blawx/blawx/static/blawx

RUN mkdir /app/blawx/blawx/static/blawx/blockly/appengine

RUN curl https://raw.githubusercontent.com/google/blockly/develop/appengine/storage.js > /app/blawx/blawx/static/blawx/blockly/appengine/storage.js

# RUN cp /blawx/blawx/static/blawx/blockly/msg/js/en.js /blawx/blawx/static/blawx/en.js


RUN npm install jquery

RUN mv ./node_modules/jquery/dist/jquery.min.js /app/blawx/blawx/static/blawx/jquery.min.js

RUN npm install bootstrap

RUN mv ./node_modules/bootstrap/dist/css/bootstrap.min.css /app/blawx/blawx/static/blawx/bootstrap.min.css

RUN mv ./node_modules/bootstrap/dist/css/bootstrap.min.css.map /app/blawx/blawx/static/blawx/bootstrap.min.css.map

RUN mv ./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js /app/blawx/blawx/static/blawx/bootstrap.bundle.min.js

RUN mv ./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map /app/blawx/blawx/static/blawx/bootstrap.bundle.min.js.map

RUN npm install bootstrap-icons

RUN mv ./node_modules/bootstrap-icons/font/bootstrap-icons.css /app/blawx/blawx/static/blawx/bootstrap-icons.css

RUN mv ./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff /app/blawx/blawx/static/blawx/fonts/bootstrap-icons.woff

RUN mv ./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2 /app/blawx/blawx/static/blawx/fonts/bootstrap-icons.woff2

COPY . blawx

WORKDIR /app/blawx

ARG SU_PASSWORD=blawx2022

ENV DJANGO_SUPERUSER_PASSWORD=$SU_PASSWORD

RUN python manage.py makemigrations

RUN python manage.py migrate --run-syncdb

RUN python manage.py createsuperuser --noinput --username admin --email admin@admin.com

RUN python load_data.py

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000