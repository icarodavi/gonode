<<<<<<< HEAD
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
=======
var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');

const app = express();

nunjucks.configure({
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
>>>>>>> 583b702ba6e925cb4b493f7d03d0c67654d969b0
