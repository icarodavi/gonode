var express = require('express');
var nunjucks = require('nunjucks');

const app = express();

nunjucks.configure({
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
