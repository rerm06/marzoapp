const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error(`Error hashing password for user ${this.username}:`, error.message, error.stack);
      next(error);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;