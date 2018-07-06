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

/**
 * User
 */
routesAPI.put('/users', controllers.userController.update);
/** **
  Tweets
 */

routesAPI.post('/tweets', controllers.tweetController.create);
routesAPI.delete('/tweets/:id', controllers.tweetController.destroy);

module.exports = routesAPI;
