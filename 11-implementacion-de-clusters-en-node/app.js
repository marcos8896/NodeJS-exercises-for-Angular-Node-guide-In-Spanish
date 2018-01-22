"use strict";

const cluster = require('cluster');
const cpuCount = require('os').cpus().length;

//Revisamos si el proceso actual es el proceso 'master'
//o maestro.
if (cluster.isMaster) {

  console.log(`Master ${process.pid} está ejecutándose ;)`);
  console.log(`Núcleos del equipo actual: `, cpuCount);

  // Creamos un proceso 'worker' por cada núcleo.
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Evento que revisa si un worker
  //muere :(
  cluster.on('exit', (worker) => {

    // En caso de perder un proceso 'worker'
    console.log(`Worker ${worker.id} died :(`);
    // creamos uno nuevo.
    cluster.fork();

  });


} else {

  const express = require('express');
  const app = express();

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  const cors = require('cors');
  app.use(cors());

  const env = require('dotenv');
  env.config();

  const pendiente = require('./pendiente/pendiente.routes');
  app.use('/pendiente', pendiente);

  const portExpress = process.env.EXPRESS_PORT;
  const hostExpress = process.env.EXPRESS_HOST;

  app.listen(portExpress, hostExpress, () => {
    console.log(`El worker ${cluster.worker.id} está listo para recibir peticiones :)!`);
  });

}

