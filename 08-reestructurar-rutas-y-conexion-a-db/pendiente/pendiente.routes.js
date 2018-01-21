const express = require('express');
const router = express.Router();

const conexion = require('../db-config/mysql-connection');


function responderAlCliente( error, res, datos ) {
  if ( error )
    res.status(500).json(error);
  else
    res.status(200).json(datos);
}


//Consulta general de todos los pendientes en la base de datos.
router
  .get('/', (req, res) => {

    if ( conexion ) {
      conexion.query('SELECT pendiente_id, descripcion, estado FROM pendientes', (error, resultados) => {

        if (error)
          return responderAlCliente( error, res );

        return responderAlCliente( null, res, resultados );
      })
    } else 
        return responderAlCliente('Hubo un error con la conexión a MySQL :(', res)
  })


  //Consultar cuando registros hay en la tabla de pendientes.
  .get('/count', (req, res) => {
    if ( conexion ) {
      conexion.query('SELECT COUNT (pendiente_id) AS numero_de_registros FROM pendientes', (error, contador) => {

        if (error){
          return responderAlCliente( error, res );
        }

        return responderAlCliente( null, res, contador );
      })
    } else 
        return responderAlCliente('Hubo un error con la conexión a MySQL :(', res);    
  })


  //Consultar cuando registros hay en la tabla de pendientes.
  .get('/siguienteIdAutoIncrementable', (req, res) => {

    if ( conexion ) {
      conexion.query(`SELECT \`AUTO_INCREMENT\` AS siguiente_id_autoincrementable
      FROM  INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = '${process.env.DB_DATABASE}'
      AND   TABLE_NAME   = 'pendientes';`, (error, siguienteId) => {

        if (error)
          return responderAlCliente( error, res );
        
        return responderAlCliente( null, res, siguienteId );
      })
    } else 
        return responderAlCliente('Hubo con error con la conexión a MySQL :(', res);    
  })


  //Consultar un pendiente por id.
  .get('/:idPendiente', (req, res) => {

    const idPendiente = req.params.idPendiente;

    if ( conexion ) {
      conexion.query(`SELECT pendiente_id, descripcion, estado
                      FROM pendientes 
                      WHERE pendiente_id = ?`, [idPendiente], (error, pendiente) => {

        if (error)
          return responderAlCliente( error, res );

        return responderAlCliente( null, res, pendiente );
      })
    } else
        return responderAlCliente('Hubo con error con la conexión a MySQL :(', res);

  })


  //Agregar un nuevo pendiente a la base de datos.
  .post('/', (req, res) => {

    const nuevoPendiente = {
      pendiente_id: null,
      descripcion: req.body.descripcion,
      estado: req.body.estado
    }

    if ( conexion ) {
      conexion.query('INSERT INTO pendientes SET ?', [nuevoPendiente], (error, respuesta) => {

        if ( error ) 
          return responderAlCliente( error, res );

        return responderAlCliente( null, res, respuesta )
          
      });
    } else 
        return responderAlCliente('Hubo con error con la conexión a MySQL :(', res);

  })


  //Modifica un pendiente existente en la base de datos.
  .put('/:idPendiente', (req, res) => {

    const idPendiente = req.params.idPendiente;

    const pendientePorEditar = {
      pendiente_id: idPendiente,
      descripcion: req.body.descripcion,
      estado: req.body.estado
    }

    if ( conexion ) {
      conexion.query(`UPDATE pendientes 
                      SET descripcion = ?, estado = ? 
                      WHERE pendiente_id = ?`,

        [pendientePorEditar.descripcion,
          pendientePorEditar.estado,
          pendientePorEditar.pendiente_id], (error, respuesta) => {
        
        if ( error ) 
          return responderAlCliente( error, res );

        return responderAlCliente( null, res, respuesta )

      });
    } else 
        return responderAlCliente('Hubo con error con la conexión a MySQL :(', res)

  })


  //Elimina un pendiente existente en la base de datos.
  .delete('/:idPendiente', (req, res) => {

    const idPendiente = req.params.idPendiente;

    if ( conexion ) {
      conexion.query(`DELETE FROM pendientes 
                      WHERE pendiente_id = ?`, [idPendiente], (error, respuesta) => {

        //Si hay un error, le respondemos al cliente con el error.
        if (error)
          return responderAlCliente( error, res );
          
        return responderAlCliente( null, res, respuesta );
      })
    } else
        return responderAlCliente('Hubo un error con la conexión a MySQL :(', res);

  })

module.exports = router;