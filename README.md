Buses
=====

## Description
The app is using YEOMEN generator https://github.com/DaftMonk/generator-angular-fullstack.

## Importing data

### Install mongo server:

```sudo apt-get install mongodb-server```

### Import stops:

```mongoimport -d buses-dev -c stops data/stops.json --jsonArray```

### Import routes:

```mongoimport -d buses-dev -c routes data/routes.json --jsonArray```

### Import services:

```mongoimport -d buses-dev -c services data/services.json --jsonArray```
