Buses
=====

## Description
The app is using YEOMEN generator https://github.com/DaftMonk/generator-angular-fullstack.

## Importing data

### Mongo server:

Make sure that mongo server buses-dev is running.

### Import stops:

```mongoimport -d buses-dev -c stops data/stops.json --jsonArray```

### Import routes:

```mongoimport -d buses-dev -c routes data/routes.json --jsonArray```

### Import services:

```mongoimport -d buses-dev -c services data/services.json --jsonArray```

### Import service routes:

```mongoimport -d buses-dev -c service_routes data/service_routes.json --jsonArray```

## TODO
- refactor for meanjs structure
- add new model for service_routes
