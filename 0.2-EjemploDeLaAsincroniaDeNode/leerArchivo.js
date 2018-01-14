//Módulo del núcleo de Node que permite el manejo de archivos.
const fs = require('fs');

//Método del módulo 'fs'
fs.readFile('archivo.txt', (err, contenido) => {
  //Comprobamos si hay algún error.
  if (err) throw err;

  //Imprimimos el contenido del archivo.
  console.log("Contenido del archivo leído en línea 10.", contenido.toString("utf8"));
});

//Imprimimos que el código se ha terminado.
console.log("Final del código - Línea 14.");
