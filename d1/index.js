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
