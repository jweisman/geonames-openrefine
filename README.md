# Geonames OpenRefine Service
Simple wrapper of the [Geonames API](http://www.geonames.org/export/web-services.html "Geonames API") which provides output in the [OpenRefine reconciliation service](https://github.com/OpenRefine/OpenRefine/wiki/Reconciliation-Service-API "OpenRefine reconciliation service") format.

## Usage
Clone the repository, install dependencies with `npm install` and start the service using `npm start`. Then browse to http://localhost:5060/reconcile.

The service uses the demo account by default. You should create a username at the [Geonames website](https://www.geonames.org/login "Geonames website") and activate it for API usage. Then you can set the `GEONAMES_USERNAME` environment variable with your username.

## Mapbox Usage
The preview functionality can show a map of the location if you provide an access token. Create a free account on the [MapBox site](https://account.mapbox.com "MapBox site") and add a new [access token](https://account.mapbox.com/access-tokens/ "access token"). Then set the token in the `MAPBOX_ACCESS_TOKEN` environment variable.


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)