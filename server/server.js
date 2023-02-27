/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

//config
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const general = require('./routes/general')

app.get('/api', general.get)

module.exports = app;