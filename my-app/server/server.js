/* eslint-disable no-undef */
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
// const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json())

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;