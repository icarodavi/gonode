const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  async toggle(req, res, next) {
    try {
      const id = req.params.id;
      const tweet = Tweet.findById(id);
      if (!tweet) {
        return res.status(400).json({ error: "Tweet doesn't exist" });
      }

      const liked = tweet.likes.indexOf(req.userId);
      if (liked === -1) {
        tweet.likes.push(req.userId);
      } else {
        tweet.likes.splices(liked, 1);
      }
      await tweet.save();
      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },
};
