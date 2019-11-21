const express = require('express');
const axios = require("axios");
const utils = require("./utils");
const cors = require('cors');


const PORT = process.env.PORT || 5060;
const GEONAMES_USERNAME = process.env['GEONAMES_USERNAME'] || 'demo';
const GEONAMES_URL = process.env['GEONAMES_URL'] || 'http://api.geonames.org/';
const MAPBOX_ACCESS_TOKEN = process.env['MAPBOX_ACCESS_TOKEN'];

var app = express();
app.set('json spaces', 2);
app.set('view engine', 'pug')
app.use(cors());

const getHost = (req) => req.protocol + '://' + req.get('host');
const getReferrer = (req) => getHost(req) + req.originalUrl;

const serviceDesc = (url) => {
  return {
    defaultTypes: [{
        id: "places",
        name: "Place search"
      }
    ],
    identifierSpace: "http://www.geonames.org/ontology/",
    name: "Geonames Reconciliation Service",
    preview: {
      height: 400,
      url: url + '/preview?id={{id}}',
      width: 250
    },
    schemaSpace: "http://www.geonames.org/ontology/",
    view: {
      url: "http://sws.geonames.org/{{id}}/"
    }
  }
}

const callGeonames = async (urls) => {
  let promises = urls.map(
    q=>axios.get(q.url)
      .then(data=>
        ( { [q.id]: { result:  data.data.geonames.map(g=>({id: g.geonameId, name: g.toponymName, score: 0, match: false, type: ['places']})) } } )
      )
    )
  return Object.assign({}, ...await Promise.all(promises));
}

app.get('/', (req, res) => res.send('OpenRefine Geonames'));

app.get('/reconcile', async (req, res) => {
  if (req.query.queries) {
    try {
      let answer = {}
      /* Unpack queries */
      let urls = Object.entries(JSON.parse(req.query.queries)).map(([k,v]) => ({id: k, url: GEONAMES_URL+`searchJSON?q=${encodeURIComponent(v.query)}&maxRows=${v.limit || 10}&username=jweisman&fuzzy=0.8`}));
      /* Chunk queries */
      await utils.asyncForEach(utils.chunk(urls, 2), async (batch) => Object.assign(answer, await callGeonames(batch)));
      /* Return response */
      res.json (answer);
    } catch(e) {
      res.status(400).send('Error: ' + e.message);
    }
  } else {
    res.json(serviceDesc(getReferrer(req)));
  }
});

app.get('/reconcile/preview', async (req, res) => {
  if (!req.query.id) res.status(400).send('ID not provided');
  else {
    const response = await axios.get(`${GEONAMES_URL}getJSON?geonameId=${req.query.id}&username=${GEONAMES_USERNAME}`);
    res.render('preview', { token: MAPBOX_ACCESS_TOKEN, data: response.data });
  }
})

app.listen(PORT);

