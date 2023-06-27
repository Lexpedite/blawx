# Install Blawx

Blawx is developed as a docker container, and is most easily deployed as a docker container.
A pre-built container image is available on docker hub, or you can build an image locally from the source files.

## Install Docker

Install Docker for the platform you are using.

## Install Blawx

### Install from Docker Image

The easiest way to run Blawx is to enter the command `docker run lexpedite/blawx`, or to use your docker application to run
the `lexpedite/blawx` image.

The Blawx server will now be available at [http://127.0.0.1:8000](http://127.0.0.1:8000),
and the administrative console will be available at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).

You can log into the admin console using the username "admin" and the password "blawx2022", which should be
changed immediately on logging in.

### Install from Source

Using git, clone this repository to your local machine.
```
git clone https://github.com/Lexpedite/blawx blawx
```

Build the blawx image using these commands... (this is only required only once per installation or upgrade)
```
cd blawx
docker build -t blawx .
```

Optionally, you can provide the `--build-arg SU_PASSWORD=password` flag on the docker build command to set the admin password at build time to avoid the default.

Run the blawx image using this command (or using the Docker graphical interface)
```
docker run -it -p 8000:8000 blawx
```

## Configuring ChatGPT Integration

If you wish to run Blawx with ChatGPT integration, which allows for AI-generated summaries of explanations to be displayed
to the user in the scenario editor, modify the docker run command as follows (or do the equivalent in the docker interface of your choice).

```
docker run -it -p 8000:8000 -e OPENAI_API_KEY="your_key_goes_here" blawx
```

## Updating Blawx

Blawx is under active development, and changes to Blawx may not be reverse compatible with prior versions. Please refer to the
CHANGELOG.md before updating.

To update the published docker image, use `docker pull lexpedite/blawx`.

To update the source, use `git pull` in the source folder, and re-build the image.

Stop the existing image if it is still running, and run the new image.

Occasionally, there are changes made to Blawx that require a fresh install dependencies but are not detected by docker when
installing from source code. If that is the case, it will usually be noted in the [changelog](CHANGELOG.md). 
If a fresh build is required, add the `--no-cache` flag to the `docker build` command.

## Deployment

Blawx is alpha software that should not be used for production purposes. However, if you want to deploy
it in a public or shared environment for learning or experimental purposes,
the provided docker configuration is not appropriate. Instead,
it should be modified to follow the process for deploying a Django app. See [the Django documentation](https://docs.djangoproject.com/en/4.0/howto/deployment/)
for more details.

Steps for deploying will include at a minimum:
* changing the server_name settings in the settings.py file
* changing the DEBUG setting in the settings.py file
* adding configurations for secure CRSF and Cookies in the settings.py file
* configuring nginx or another proxy server to directly serve static files
* configuring TLS
* replacing the manage.py runserver with a production WSGI web server
* replacing the CORS configuration (which is open by default) with a whitelist

## Integration with Other Containers

If you are deploying Blawx as a container in a docker compose configuration, it is often useful to have certain .blawx files
pre-loaded and published when your Blawx server starts. This can be accomplished in a docker-compose.yml file by following these steps:

1. Export the published `.blawx` files that you want deployed from a single Blawx server, or manually edit the files to ensure that each
   uses a different primary key for each RuleDoc element.
2. Change the extension of the `.blawx` files to `.yaml`.
3. Place the files in a folder in your compose project, like `blawx/fixtures`.
4. Create a volume that links this folder to the fixtures folder inside your blawx server, like this:
```
services:
  blawx:
    container_name: blawx_server
    image: lexpedite/blawx
    ports: 
      - "8000:8000"
    volumes:
      - ./blawx/fixtures:/app/blawx/blawx/fixtures
```
5. Add a `command` that will load the files in that folder before running the server, like this:
```
services:
  blawx:
    container_name: blawx_server
    image: lexpedite/blawx
    ports: 
      - "8000:8000"
    volumes:
      - ./blawx/fixtures:/app/blawx/blawx/fixtures
    command: ["sh", "-c", "python3 manage.py loaddata blawx/fixtures/nrcan-map/*.yaml && python manage.py runserver 0.0.0.0:8000"]
```

Note that your command for running the server may not be `python manage.py runserver 0.0.0.0:8000`,
and should be updated to match whatever command you are using to run your blawx server in production.