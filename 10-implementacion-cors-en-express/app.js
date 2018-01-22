"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const env = require('dotenv');
env.config();

const pendiente = require('./pendiente/pendiente.routes');
app.use('/pendiente', pendiente);

const portExpress = process.env.EXPRESS_PORT;
const hostExpress = process.env.EXPRESS_HOST;


app.listen(portExpress, hostExpress, () => {
  console.log(`¡Escuchando en ${hostExpress}:${portExpress}/`);
});

