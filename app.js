const express = require('express');
const cors = require('cors');
var app = express();

const FormularioRutas = require('./src/routes/formulario.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api',FormularioRutas);


module.exports = app;