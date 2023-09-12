const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('users', AuthSchema);