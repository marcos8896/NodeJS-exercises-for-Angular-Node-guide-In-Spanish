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

app.get('/', (req, res) => {
  return res.status(200).json(pendientesPorHacer);
})

app.get('/count', (req, res) => {

  
  const miRespuesta = {
    "numeroDeRegistros": pendientesPorHacer.length
  }
  return res.status(200).json(miRespuesta);
})

.get('/:idPendiente', (req, res) => {

  const idPendiente = req.params.idPendiente;
  const pendienteBuscado = pendientesPorHacer.find( pendiente => pendiente.id == idPendiente );
  
  if( pendienteBuscado === undefined )
      return res.status(404).json({ mensaje : "No se encontró esa lista en el servidor :(" });
  else
    return res.status(200).json(pendienteBuscado);
})

app.listen(port, host, () => {
  console.log(`¡Escuchando en ${host}:${port}/`);
});