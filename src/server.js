const express = require('express');
const cors = require('cors')
const routes = require('./routes');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, (req, res) => console.log('running 🐘')); // ROTA DO LOCALHOST = 3333