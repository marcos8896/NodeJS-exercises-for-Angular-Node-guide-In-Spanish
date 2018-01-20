"use strict";

const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
const pendientesPorHacer = [
  {id: 1, descripcion: "Comprar comida", completada: true},
  {id: 2, descripcion: "Preparar comida", completada: false},
  {id: 3, descripcion: "Pasear al perro", completada: true},
  {id: 4, descripcion: "Estudiar React y VueJS", completada: false},
  {id: 5, descripcion: "Terminar series pendientes", completada: false},
  {id: 6, descripcion: "Reparar el celular", completada: true}
]

app.get('/', (req, res) => { /*Código*/ }).app.get('/count', (req, res) => { /*Código*/ })
.get('/:idPendiente', (req, res) => { /*Código*/ }).listen(port, host, () => { /*Código*/ });




