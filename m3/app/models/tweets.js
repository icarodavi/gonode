const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlegth: 280,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAd: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Tweet', TweetSchema);
