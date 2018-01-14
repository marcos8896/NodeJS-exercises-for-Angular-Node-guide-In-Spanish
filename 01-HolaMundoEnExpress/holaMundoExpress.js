const express = require('express');
const app = express();

const listaDeQuehaceres = [
  {id: 1, descripcion: "", completada: false},
  {id: 2, descripcion: "", completada: false},
  {id: 3, descripcion: "", completada: false},
  {id: 4, descripcion: "", completada: false},
  {id: 5, descripcion: "", completada: false},
  {id: 6, descripcion: "", completada: false}
]

app.get('/', (req, res) => {
  res.send('¡Hola mundo!');
});

//(4) Le indicamos a 'express' que escuche posibles peticiones en el puerto 3000.
const port = 3000;
const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log('¡Escuchando en puerto 3000!');
});