"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3000;
const host = '127.0.0.1';
const pendientesPorHacer = [
  {id: 1, descripcion: "Comprar comida", completado: true},
  {id: 2, descripcion: "Preparar comida", completado: false},
  {id: 3, descripcion: "Pasear al perro", completado: true},
  {id: 4, descripcion: "Estudiar React y VueJS", completado: false},
  {id: 5, descripcion: "Terminar series pendientes", completado: false},
  {id: 6, descripcion: "Reparar el celular", completado: true}
]


//Función para encontrar el siguiente Id.
function obtenerSiguienteId() {

  const tamañoArray = pendientesPorHacer.length;
  let idMayor = pendientesPorHacer[0].id || 1;

  for (let i = 1; i < tamañoArray; i++) {
    if(pendientesPorHacer[i].id > idMayor)
      idMayor = pendientesPorHacer[i].id;
  }

  return idMayor + 1;

}

function encontrarPorId( idPendiente ) {
  const pendienteIndex = pendientesPorHacer.findIndex( pendiente => pendiente.id == idPendiente );
  //Si se encuentra el pendiente, 'pendienteBuscado' contendrá
  //la posición del pendiente en el array de 'pendientesPorHacer'
  //sino, 'pendienteBuscado' contrendrá una -1
  return pendienteIndex;
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

  const pendienteIndex = encontrarPorId( req.params.idPendiente );

  if( pendienteIndex === -1 )
    return res.status(404).json({ 
      mensaje : "No se encontró ese pendiente en el servidor :(" });
  else 
    return res.status(200).json( pendientesPorHacer[pendienteIndex] );
  
})


//Agregar un nuevo elemento al array.
.post('/', (req, res) => {

  //Body Parser nos permite obtener los parámetros de las peticiones POST
  //en el objeto req.body
  const nuevoPendiente = {
    id: obtenerSiguienteId(),
    descripcion: req.body.descripcion,
    completado: req.body.completado
  }

  pendientesPorHacer.push(nuevoPendiente);

  const miRespuesta = {
    registroAgregado: nuevoPendiente,
    mensaje: "Registro agregado exitosamente :)"
  }

  return res.status(200).json(miRespuesta);

})

//Modifica un elemento existente al array.
.put('/:idPendiente', (req, res) => {

  const pendienteIndex = encontrarPorId( req.params.idPendiente );

  if( pendienteIndex === -1 ) {
    return res.status(404).json({ 
      mensaje : "No se encontró ese pendiente en el servidor :(" });
  }

  //Body Parser nos permite obtener los parámetros de las peticiones PUT
  //en el objeto req.body 
  console.log("tipo", typeof(req.body.completado));
  let pendienteEditado = {
    id: pendientesPorHacer[ pendienteIndex ].id,
    descripcion: req.body.descripcion || pendientesPorHacer[ pendienteIndex ].descripcion,
    completado: req.body.completado !== undefined
                ? req.body.completado
                : pendientesPorHacer[ pendienteIndex ].completado
  }
  console.log('pendienteEditado.completado: ', pendienteEditado.completado);
  

  //Reemplazamos el pendiente actual por el modificado.
  pendientesPorHacer[ pendienteIndex ] = pendienteEditado;

  const miRespuesta = {
    registroModificado: pendienteEditado,
    mensaje: "Registro editado exitosamente :)"
  }

  return res.status(200).json( miRespuesta );
  

})

.delete('/:idPendiente', (req, res) => {

  const pendienteIndex = encontrarPorId( req.params.idPendiente );
  
  if( pendienteIndex === -1 ) {
    return res.status(404).json({ 
      mensaje : "No se encontró ese pendiente en el servidor :(" });
    }
    
  const pendienteEliminado = pendientesPorHacer[ pendienteIndex ];
  
  //Eliminamos el pendiente del array 'pendientesPorHacer'
  //con Array.splice.
  pendientesPorHacer.splice( pendienteIndex, 1 );

  const miRespuesta = {
    registroEliminado: pendienteEliminado,
    mensaje: "Registro eliminado exitosamente cx"
  }

  return res.status(200).json( miRespuesta );
  

})


app.listen(port, host, () => {
  console.log(`¡Escuchando en ${host}:${port}/`);
});

