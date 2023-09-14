const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

//mongoose.connect(`mongodb+srv://${process.env.DB_MOCK_USER}:${process.env.DB_MOCK_PW}@cluster0.nfywrnu.mongodb.net/${process.env.DB_MOCK_COLLECTION}`);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvxkpcl.mongodb.net/test`);

let db = mongoose.connection;

module.exports = db;