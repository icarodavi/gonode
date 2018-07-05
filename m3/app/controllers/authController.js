const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email, username } = req.body;
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'User already exists!' });
      }
      const user = await User.create(req.body);
      return res.status(200).json({ user, token: user.generateToken() });
    } catch (err) {
      return next(err);
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not foud!' });
      }
      if (!(await user.compareHash(password))) {
        return res.status(403).json({ error: 'Invalid Password' });
      }
      user.password = null;
      return res.status(200).json({ user, token: user.generateToken() });
    } catch (err) {
      next(err);
    }
  }
};
