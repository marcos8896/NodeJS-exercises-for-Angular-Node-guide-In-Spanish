//El método find de un Array, itera dicho array.
const pendienteBuscado = pendientesPorHacer.find( pendiente => pendiente.id == idPendiente );

const pendientesPorHacer = [
  {id: 1, descripcion: "Comprar comida", completada: true}, //pendiente1 - Iteración 1
  {id: 2, descripcion: "Preparar comida", completada: false}, //pendiente2 - Iteración 2
  {id: 3, descripcion: "Pasear al perro", completada: true}, //pendiente3 - Iteración 3
  {id: 4, descripcion: "Estudiar React y VueJS", completada: false}, //pendiente4 - Iteración 4
  {id: 5, descripcion: "Terminar series pendientes", completada: false}, //pendiente5 - Iteración 5
  {id: 6, descripcion: "Reparar el celular", completada: true} //pendiente6 - Iteración 6
]

//Primera iteración - pendientesPorHacer.find( pendiente1 => pendiente1.id == idPendiente );
//Segunda iteración - pendientesPorHacer.find( pendiente2 => pendiente2.id == idPendiente );
//Tercera iteración - pendientesPorHacer.find( pendiente3 => pendiente3.id == idPendiente );
//Cuarta iteración - pendientesPorHacer.find( pendiente4 => pendiente4.id == idPendiente );
//Quinta iteración - pendientesPorHacer.find( pendiente5 => pendiente5.id == idPendiente );
//Sexta iteración - pendientesPorHacer.find( pendiente6 => pendiente6.id == idPendiente );
