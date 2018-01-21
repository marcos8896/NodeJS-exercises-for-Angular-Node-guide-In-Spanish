"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');
const conexion = mysql.createConnection({
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




//Función auxiliar para responderle al cliente
function responderAlCliente( error, res, datos ) {
  if ( error )
    res.status(500).json(error);
  else
    res.status(200).json(datos);
}




//Consulta general de todos los pendientes en la base de datos.
app.get('/', (req, res) => {

  if ( conexion ) {
    conexion.query('SELECT pendiente_id, descripcion, estado FROM pendientes', (error, resultados) => {

      //Si hay un error, le respondemos al cliente con el error.
      if (error){
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con los
      //resultados de la query.
      return responderAlCliente( null, res, resultados );
    })
  } else {
    //Si hay un error en la conexión, se lo indicamos al cliente.
    return responderAlCliente('Hubo un error con la conexión a MySQL :(', res)
  }

})




//Consultar cuando registros hay en la tabla de pendientes.
.get('/count', (req, res) => {
  if ( conexion ) {
    conexion.query('SELECT COUNT (pendiente_id) AS numero_de_registros FROM pendientes', (error, contador) => {

      //Si hay un error, le respondemos al cliente con el error.
      if (error){
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con
      //el contador de la query.
      return responderAlCliente( null, res, contador );
    })
  } else {
    //Si hay un error en la conexión, se lo indicamos al cliente.
    return responderAlCliente('Hubo un error con la conexión a MySQL :(', res)
  }
  
})




//Consultar cuando registros hay en la tabla de pendientes.
.get('/siguienteIdAutoIncrementable', (req, res) => {

  if ( conexion ) {
    conexion.query(`SELECT \`AUTO_INCREMENT\` AS siguiente_id_autoincrementable
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'db_pendientes'
    AND   TABLE_NAME   = 'pendientes';`, (error, siguienteId) => {

      //Si hay un error, le respondemos al cliente con el error.
      if (error){
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con
      //el siguienteId.
      return responderAlCliente( null, res, siguienteId );
    })
  } else {
    //Si hay un error en la conexión, se lo indicamos al cliente.
    return responderAlCliente('Hubo con error con la conexión a MySQL :(', res)
  }
  
})




//Consultar un pendiente por id.
.get('/:idPendiente', (req, res) => {

  const idPendiente = req.params.idPendiente;

  if ( conexion ) {
    conexion.query(`SELECT pendiente_id, descripcion, estado
                    FROM pendientes 
                    WHERE pendiente_id = ?`, [idPendiente], (error, pendiente) => {

      //Si hay un error, le respondemos al cliente con el error.
      if (error){
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con
      //el pendiente retornado obtenido de la query.
      return responderAlCliente( null, res, pendiente );
    })
  } else {
    //Si hay un error en la conexión, se lo indicamos al cliente.
    return responderAlCliente('Hubo con error con la conexión a MySQL :(', res)
  }

})




//Agregar un nuevo pendiente a la base de datos.
.post('/', (req, res) => {

  /*
    pendiente_id lo mandamos como null para
    que el AUTO_INCREMENT de MySQL asigne
    a pendiente_id autoincrementalmente.
  */
  const nuevoPendiente = {
    pendiente_id: null,
    descripcion: req.body.descripcion,
    estado: req.body.estado
  }

  if ( conexion ) {

    conexion.query('INSERT INTO pendientes SET ?', [nuevoPendiente], (error, respuesta) => {

      if ( error ) {
        //Si hay un error, le respondemos al cliente con el error.
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con
      //la repuesta retornada, obtenida de la query.
      return responderAlCliente( null, res, respuesta )
        
    });
  } else 
      return responderAlCliente('Hubo con error con la conexión a MySQL :(', res)

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
      
      if ( error ) {
        //Si hay un error, le respondemos al cliente con el error.
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con
      //la repuesta retornada, obtenida de la query.
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
      if (error){
        return responderAlCliente( error, res );
      }

      //Si no hay error, le respondemos al cliente con
      //la respuesta retornada obtenido de la query.
      return responderAlCliente( null, res, respuesta );
    })
  } else {
    //Si hay un error en la conexión, se lo indicamos al cliente.
    return responderAlCliente('Hubo un error con la conexión a MySQL :(', res)
  }

})




const portExpress = 3000;
const hostExpress = '127.0.0.1';
app.listen(portExpress, hostExpress, () => {
  console.log(`¡Escuchando en ${hostExpress}:${portExpress}/`);
});

