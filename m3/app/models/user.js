const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 8);
});
UserSchema.methods = {
  async compareHash(password) {
    return await bcrypt.compare(password, this.password);
  },
  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: 86400
    });
  }
};

mongoose.model('User', UserSchema);
