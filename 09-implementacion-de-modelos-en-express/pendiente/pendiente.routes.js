const express = require('express');
const router = express.Router();

//Importamos el modelo de Pendiente.
const Pendiente = require('./pendiente.model');


//Consulta general de todos los pendientes en la base de datos.
router
  .get('/', (req, res) => {
    return Pendiente.obtenerTodos( res, Pendiente.responderAlCliente );
  })


  //Consultar cuando registros hay en la tabla de pendientes.
  .get('/count', (req, res) => {
    return Pendiente.contador( res, Pendiente.responderAlCliente );
  })


  //Consultar cuando registros hay en la tabla de pendientes.
  .get('/siguienteIdAutoIncrementable', (req, res) => {
    return Pendiente.siguienteId( res, Pendiente.responderAlCliente );
  })


  //Consultar un pendiente por id.
  .get('/:idPendiente', (req, res) => {

    const idPendiente = req.params.idPendiente;
    return Pendiente.encontrarPorId( idPendiente, res, Pendiente.responderAlCliente );
  })


  //Agregar un nuevo pendiente a la base de datos.
  .post('/', (req, res) => {

    const nuevoPendiente = {
      pendiente_id: null,
      descripcion: req.body.descripcion,
      estado: req.body.estado
    }

    return Pendiente.insertar( nuevoPendiente, res, Pendiente.responderAlCliente );
  })


  //Modifica un pendiente existente en la base de datos.
  .put('/:idPendiente', (req, res) => {

    const idPendiente = req.params.idPendiente;

    const pendientePorEditar = {
      pendiente_id: idPendiente,
      descripcion: req.body.descripcion,
      estado: req.body.estado
    }

    return Pendiente.actualizar( pendientePorEditar, res, Pendiente.responderAlCliente );
  })


  //Elimina un pendiente existente en la base de datos.
  .delete('/:idPendiente', (req, res) => {

    const idPendiente = req.params.idPendiente;
    return Pendiente.eliminar( idPendiente, res, Pendiente.responderAlCliente );

  })

module.exports = router;