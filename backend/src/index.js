const express = require('express');
const app = express();
const routesTarefas = require('./routers/TarefasRouters')
const routesAuth = require('./routers/AuthRouters')
const cors = require('cors');


require('./config/dbConfig');

app.use(cors());
app.use(express.json());
app.use(routesAuth,routesTarefas);

app.listen(3333);
