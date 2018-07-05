const express = require('express');
const requireDir = require('require-dir');
const routes = express.Router();

const controllers = requireDir('./controllers');

const authMiddleware = require('../app/middlewares/authMiddleware');
/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Auth roles
 */
routes.use(authMiddleware);
;

routes.get('/tweets', (req, res, next) => {
  return res.status(200).json({ message: 'ok' });
});

module.exports = routes;
