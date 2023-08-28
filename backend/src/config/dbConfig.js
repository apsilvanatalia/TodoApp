const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user-admin:T7wfU1YMT53hryLT@cluster0.nfywrnu.mongodb.net/TodoApp');

let db = mongoose.connection;

module.exports = db;