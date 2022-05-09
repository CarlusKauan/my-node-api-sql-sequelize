const express = require('express');
const cors = require('cors')
const routes = require('./routes');
const path = require('path');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(3333);
//app.listen(3333, (req, res) => console.log('running 🐘'));


