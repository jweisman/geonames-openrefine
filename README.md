# Geonames OpenRefine Service
Simple wrapper of the [Geonames API](http://www.geonames.org/export/web-services.html "Geonames API") which provides output in the [OpenRefine reconciliation service](https://github.com/OpenRefine/OpenRefine/wiki/Reconciliation-Service-API "OpenRefine reconciliation service") format.

## Usage
Clone the repository, install dependencies with `npm install` and start the service using `npm start`. Then browse to http://localhost:5060/reconcile. 
* To test a search, use http://localhost:5060/reconcile?queries=%7B%22326c79e2%22:%7B%22query%22:%22Binghamton,%20NY%22,%22limit%22:10%7D%7D. 
* To test a preview, use http://localhost:5060/reconcile/preview?id=5109177.

The service uses the demo account by default. You should create a username at the [Geonames website](https://www.geonames.org/login "Geonames website") and activate it for API usage. Then you can set the `GEONAMES_USERNAME` environment variable with your username.

## Mapbox Usage
The preview functionality can show a map of the location if you provide an access token. Create a free account on the [MapBox site](https://account.mapbox.com "MapBox site") and add a new [access token](https://account.mapbox.com/access-tokens/ "access token"). Then set the token in the `MAPBOX_ACCESS_TOKEN` environment variable.


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)