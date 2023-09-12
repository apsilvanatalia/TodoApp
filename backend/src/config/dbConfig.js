const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user-admin:T7wfU1YMT53hryLT@cluster0.nfywrnu.mongodb.net/TodoApp');
//mongoose.connect('mongodb+srv://Enzovp01:Teste123@cluster0.kvxkpcl.mongodb.net/test');

let db = mongoose.connection;

module.exports = db;