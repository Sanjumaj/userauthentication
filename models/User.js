const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/,
      },
      email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      },
      phone: {
        type: String,
        required: true,
        match: /^[0-9]+$/,
      },
      address: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s,-]+$/,
      },
      username: {
        type: String,
        unique: true, // Ensure uniqueness
    },
      password: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    //   hash: String,
    //   salt: String,
    });


    const User = mongoose.model('User',UserSchema);

    module.exports = User;