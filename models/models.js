var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

var sequelize = new Sequelize(null, null, null, 
  { dialect:  "sqlite",
    storage:  "quiz.sqlite"  // solo SQLite (.env)
  }      
);

// Importar definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz=Quiz;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
          if(count === 0) {   // la tabla se inicializa solo si está vacía
            Quiz.create({pregunta: 'Capital de Italia',   
	                 respuesta: 'Roma'
			})
               .success(function(){console.log('Base de datos (tabla quiz) inicializada')});
          };
        });
      });
 
 
