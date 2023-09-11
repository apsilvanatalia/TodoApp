const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    title: String,
    description: String,
    conclusion: Date,
    status: String,
    userId: String,
})

module.exports = mongoose.model('user', UserSchema);