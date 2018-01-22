
const mysql = require('mysql');
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

conexion.connect(err => {
  if (err) {
    console.log('Error trying to connect with Data Base: ' + err.stack);
    throw err;
  }

  console.log("Conexión exitosa con la base de datos c:")
});


module.exports = conexion;