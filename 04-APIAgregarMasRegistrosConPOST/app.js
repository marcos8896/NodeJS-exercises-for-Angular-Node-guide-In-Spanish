"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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


//Función para encontrar el siguiente Id.
function obtenerSiguienteId() {

  const tamañoArray = pendientesPorHacer.length;
  let idMayor = pendientesPorHacer[0].id;

  for (let i = 1; i < tamañoArray; i++) {
    if(pendientesPorHacer[i].id > idMayor)
      idMayor = pendientesPorHacer[i].id;
  }

  return idMayor + 1;

}


//Consulta general
app.get('/', (req, res) => {
  return res.status(200).json(pendientesPorHacer);
})


//Consultar cuando registros hay en el array de pendientesPorHacer.
.get('/count', (req, res) => {

  const miRespuesta = {
    "numeroDeRegistros": pendientesPorHacer.length
  }
  return res.status(200).json(miRespuesta);
})


//Consultar un elemento en el array de pendientesPorHacer por Id.
.get('/:idPendiente', (req, res) => {

  const idPendiente = req.params.idPendiente;
  const pendienteBuscado = pendientesPorHacer.find( pendiente => pendiente.id == idPendiente );
  
  if( pendienteBuscado === undefined )
      return res.status(404).json({ mensaje : "No se encontró ese pendiente en el servidor :(" });
  else
    return res.status(200).json(pendienteBuscado);
})


//Agregar un nuevo elemento al array.
.post('/', (req, res) => {

  //Body Parser nos permite obtener los parámetros de las peticiones POST
  //en el objeto req.body
  const nuevoPendiente = {
    id: obtenerSiguienteId(),
    descripcion: req.body.descripcion,
    completada: req.body.completada
  }

  pendientesPorHacer.push(nuevoPendiente);

  const miRespuesta = {
    registroAgregado: nuevoPendiente,
    mensaje: "Registro agregado exitosamente :)"
  }

  return res.status(200).json(miRespuesta);

})


app.listen(port, host, () => {
  console.log(`¡Escuchando en ${host}:${port}/`);
});

