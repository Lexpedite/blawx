# Install Blawx

The recommended method of installing and running Blawx is with Docker.

## Install Docker

Install Docker for the platform you are using.

## Clone Blawx

Using git, clone this repository to your local machine.
```
git clone https://github.com/Lexpedite.blawx blawx
```

## Build Blawx

Build the blawx image with the following commands
```
cd blawx
docker build . -t blawx
```

This command will take several minutes to run.

## Run Blawx

Run the newly generated blawx image with the following command:
```
docker run -d -p 8000:8000 blawx
```

The Blawx server will now be available at [http://127.0.0.1:8000](http://127.0.0.1:8000),
and the administrative console will be available at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
