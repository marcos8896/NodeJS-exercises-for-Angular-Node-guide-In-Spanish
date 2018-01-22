
const conexion = require('../db-config/mysql-connection');
let Pendiente = { };

Pendiente.obtenerTodos = ( res, cb ) => {

  if ( conexion ) {
    conexion.query('SELECT pendiente_id, descripcion, estado FROM pendientes', (error, resultados) => {

      if (error)
        return cb( error, res );

      return cb( null, res, resultados );
    })
  } else 
      return cb('Hubo un error con la conexión a MySQL :(', res);
}


Pendiente.contador = ( res, cb ) => {
  
  if ( conexion ) {
    conexion.query('SELECT COUNT (pendiente_id) AS numero_de_registros FROM pendientes', (error, contador) => {

      if ( error )
        return cb( error, res );

      return cb( null, res, contador );
    })
  } else 
      return cb('Hubo un error con la conexión a MySQL :(', res); 
}


Pendiente.siguienteId = ( res, cb ) => {
  
  if ( conexion ) {
    conexion.query(`SELECT \`AUTO_INCREMENT\` AS siguiente_id_autoincrementable
                    FROM  INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_SCHEMA = '${process.env.DB_DATABASE}'
                    AND   TABLE_NAME   = 'pendientes';`, (error, siguienteId) => {

      if (error)
        return cb( error, res );
      
      return cb( null, res, siguienteId );
    })
  } else 
      return cb('Hubo con error con la conexión a MySQL :(', res);
}


Pendiente.encontrarPorId = ( idPendiente, res, cb ) => {
  
  if ( conexion ) {
    conexion.query(`SELECT pendiente_id, descripcion, estado
                    FROM pendientes 
                    WHERE pendiente_id = ?`, [idPendiente], (error, pendiente) => {

      if (error)
        return cb( error, res );

      return cb( null, res, pendiente );
    })
  } else
      return cb('Hubo con error con la conexión a MySQL :(', res);
}


Pendiente.insertar = ( nuevoPendiente, res, cb ) => {

  if ( conexion ) {
    conexion.query('INSERT INTO pendientes SET ?', [nuevoPendiente], (error, respuesta) => {

      if ( error ) 
        return cb( error, res );

      return cb( null, res, respuesta )
        
    });
  } else 
      return cb('Hubo con error con la conexión a MySQL :(', res);
}


Pendiente.actualizar = ( pendientePorEditar, res, cb ) => {

  if ( conexion ) {
    conexion.query(`UPDATE pendientes 
                    SET descripcion = ?, estado = ? 
                    WHERE pendiente_id = ?`,

      [pendientePorEditar.descripcion,
        pendientePorEditar.estado,
        pendientePorEditar.pendiente_id], (error, respuesta) => {
      
      if ( error ) 
        return cb( error, res );

      return cb( null, res, respuesta )

    });
  } else 
      return cb('Hubo con error con la conexión a MySQL :(', res)
}


Pendiente.eliminar = ( idPendiente, res, cb ) => {
  if ( conexion ) {
    conexion.query(`DELETE FROM pendientes 
                    WHERE pendiente_id = ?`, [idPendiente], (error, respuesta) => {

      //Si hay un error, le respondemos al cliente con el error.
      if (error)
        return cb( error, res );
        
      return cb( null, res, respuesta );
    })
  } else
      return cb('Hubo un error con la conexión a MySQL :(', res);
}


Pendiente.responderAlCliente = ( error, res, datos ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(200).json(datos);
}

module.exports = Pendiente;