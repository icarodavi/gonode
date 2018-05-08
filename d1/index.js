const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const mjs = require('moment');

var idade;

const app = express();
const checkMiddleware = (req, res, next) => {
  console.log(req.body);
  idade = mjs().diff(mjs(req.body.dt_nasc,
    'DD/MM/YYYY'), 'years');
  req.body.dt_nasc = mjs(req.body.dt_nasc).format('DD/MM/YYYY');
    console.log(idade);
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

app.post('/check', checkMiddleware, (req, res) => {
  res.send(`Olá ${req.body.nome} sua data de nascimento é ${req.body.dt_nasc} sua idade é ${idade}`);

});

app.listen(3000);
