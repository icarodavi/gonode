const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const dbConfig = require('./config/database');

mongoose.connect(dbConfig.url);
requireDir(dbConfig.path);
app.use(bodyParser.json());

app.listen(3000);
