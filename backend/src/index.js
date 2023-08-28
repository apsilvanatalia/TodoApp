const express = require('express');
const app = express();
const routes = require('./routers')
const cors = require('cors');


require('./config/dbConfig');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
