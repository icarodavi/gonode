const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const mjs = require('moment');

let idade;

const app = express();
const checkMiddleware = (req, res, next) => {
  idade = mjs(Date.now()).diff(req.body.dt_nasc, 'years');
  req.body.dt_nasc = mjs(req.body.dt_nasc).format('DD/MM/YYYY');
  next();
};

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

// Metodos
app.get('/', (req, res) => {
  res.redirect('/main');
});

app.get('/main', (req, res) => {
  res.render('main');
});

app.get('/major', (req, res) => {
  res.render('major');
});

app.get('/minor', (req, res) => {
  res.send('minor');
});
app.post('/check', checkMiddleware, (req, res) => {
  if (idade > 18) {
    console.log(req.body);
    res.redirect('/major');
  } else {
    res.redirect('/minor');
  }
});

app.listen(3000);
