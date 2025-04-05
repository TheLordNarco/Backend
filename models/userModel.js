const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'employee', 'admin'], default: 'client' },
  status: { type: String, enum: ['active', 'pending'], default: 'pending' },
});

module.exports = mongoose.model('User', UserSchema);
