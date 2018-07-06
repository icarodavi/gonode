const express = require('express');
const requireDir = require('require-dir');

const routesAPI = express.Router();
const controllers = requireDir('./controllers');
const authMiddleware = require('../app/middlewares/authMiddleware');
/**
 * Auth
 */
routesAPI.post('/signup', controllers.authController.signup);
routesAPI.post('/signin', controllers.authController.signin);

/**
 * Auth roles
 */
routesAPI.use(authMiddleware);
/** **
  Tweets
 */

routesAPI.post('/tweets', controllers.tweetController.create);
routesAPI.delete('/tweets/:id', controllers.tweetController.create);

module.exports = routesAPI;
