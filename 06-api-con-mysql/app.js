"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');

var conexion = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'qwerty1234',
  port: 3306,
  database: 'db_pendientes'
});

conexion.connect(err => {
  if (err) {
    console.log('Error trying to connect with Data Base: ' + err.stack);
    throw err;
  }

  console.log("Conexión exitosa con la base de datos c:")
});



//Consulta general
app.get('/', (req, res) => {

  if ( conexion ) {
    conexion.query('SELECT pendiente_id, descripcion, estado FROM pendientes', (error, resultados) => {

      if (error){
        return responderAlCliente( error, res );
      }

      return responderAlCliente( null, res, resultados );
    })
  } else {
    return responderAlCliente('Hubo con error con la conexión a MySQL :(', res)
  }

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

    const pendienteIndex = encontrarPorId(req.params.idPendiente);

    if (pendienteIndex === -1)
      return res.status(404).json({
        mensaje: "No se encontró ese pendiente en el servidor :("
      });
    else
      return res.status(200).json(pendientesPorHacer[pendienteIndex]);

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

  //Agregar un nuevo elemento al array.
  .put('/:idPendiente', (req, res) => {

    const pendienteIndex = encontrarPorId(req.params.idPendiente);

    if (pendienteIndex === -1) {
      return res.status(404).json({
        mensaje: "No se encontró ese pendiente en el servidor :("
      });
    }

    //Body Parser nos permite obtener los parámetros de las peticiones PUT
    //en el objeto req.body 
    console.log("tipo", typeof (req.body.completado));
    let pendienteEditado = {
      id: pendientesPorHacer[pendienteIndex].id,
      descripcion: req.body.descripcion || pendientesPorHacer[pendienteIndex].descripcion,
      completado: req.body.completado !== undefined
        ? req.body.completado
        : pendientesPorHacer[pendienteIndex].completado
    }
    console.log('pendienteEditado.completado: ', pendienteEditado.completado);


    //Reemplazamos el pendiente actual por el modificado.
    pendientesPorHacer[pendienteIndex] = pendienteEditado;

    const miRespuesta = {
      registroModificado: pendienteEditado,
      mensaje: "Registro editado exitosamente :)"
    }

    return res.status(200).json(miRespuesta);


  })

  .delete('/:idPendiente', (req, res) => {

    const pendienteIndex = encontrarPorId(req.params.idPendiente);

    if (pendienteIndex === -1) {
      return res.status(404).json({
        mensaje: "No se encontró ese pendiente en el servidor :("
      });
    }

    const pendienteEliminado = pendientesPorHacer[pendienteIndex];

    //Eliminamos el pendiente del array 'pendientesPorHacer'
    //con Array.splice.
    pendientesPorHacer.splice(pendienteIndex, 1);

    const miRespuesta = {
      registroEliminado: pendienteEliminado,
      mensaje: "Registro eliminado exitosamente cx"
    }

    return res.status(200).json(miRespuesta);


  })

function responderAlCliente(error, res, datos) {
  if (error)
    res.status(500).json(error);
  else
    res.status(200).json(datos);
}

const portExpress = 3000;
const hostExpress = '127.0.0.1';
app.listen(portExpress, hostExpress, () => {
  console.log(`¡Escuchando en ${hostExpress}:${portExpress}/`);
});

