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
	wget  https://github.com/JanWielemaker/sCASP/archive/4a75bdaddbe17ad46b68f9a715d138fbddb83b78.zip ; \
	unzip 4a75bdaddbe17ad46b68f9a715d138fbddb83b78.zip; \
	mv sCASP-4a75bdaddbe17ad46b68f9a715d138fbddb83b78 sCASP; \
	rm 4a75bdaddbe17ad46b68f9a715d138fbddb83b78.zip

COPY --from=prolog /usr/lib/swipl/ /usr/lib/swipl/

RUN ln -s /usr/lib/swipl/bin/x86_64-linux/swipl /usr/local/bin/swipl

RUN set -eux; \
  cd sCASP; \
  swipl -g "pack_install('.',[interactive(false)])" -t halt

COPY ./blawx/requirements.txt blawx/blawx/requirements.txt

RUN pip3 install -r blawx/blawx/requirements.txt

COPY . blawx

RUN git clone --depth=1 https://github.com/google/blockly  --branch blockly-v8.0.2 blawx/blawx/static/blawx/blockly 

RUN cp ./blawx/blawx/static/blawx/blockly/msg/js/en.js /app/blawx/blawx/static/blawx/en.js

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

WORKDIR /app/blawx

ARG SU_PASSWORD=blawx2022

ENV DJANGO_SUPERUSER_PASSWORD=$SU_PASSWORD

RUN python manage.py makemigrations

RUN python manage.py migrate --run-syncdb

RUN python manage.py createsuperuser --noinput --username admin --email admin@admin.com

RUN python load_data.py

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
