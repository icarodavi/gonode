const path = require('path');

module.exports = {
  url: process.env.DB_URL,
  modelsPath: path.resolve('app', 'models'),
};
