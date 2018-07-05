const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.autorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Wrong token format' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
