var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz

////                         ****** ATENCIÓN ******
//// En las nuevas versiones de Sequelize el interfaz ha cambiado para usar "Promesas".
//// A grandes rasgos hay que cambiar .success por .then, .error por .catch y .done por .finally.
////                         ****** ATENCIÓN ******

// sequelize.sync() crea e inicializa tabla de preguntas en DB
// sequelize.sync().success(function() {
// success(...) ejecuta el manejador una vez creada la tabla
sequelize.sync().then(function() {
  // Quiz.count().success(function (count){
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: '¿Cuál es la capital de Italia?',
      	            respuesta: 'Roma'
      	         })
      // .success(function(){console.log('Base de datos inicializada')});
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});