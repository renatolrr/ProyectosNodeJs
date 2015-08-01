var models = require('../models/models.js');

//Autoload 
exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
			req.quiz =quiz;
			next();
		}else{
			next(new Error('No existe quizID='+quizID));}
	}
	).catch(function(error){next(error);});
};
//GET /quizes
exports.index = function(req, res) {  
  models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }
    ).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
//	models.Quiz.find(req,params,quizId).then(function(quiz){  
	res.render('quizes/show', { quiz: req.quiz});
//     })
};       

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado='Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta) {
   			resultado= "Correcto";
		}
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado}); 
				
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz= models.Quiz.build(//crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
		
		res.render('quizes/new', {quiz: quiz}); 
				
};

// GET /quizes/create
exports.create = function(req, res) {
	var quiz= models.Quiz.build( req.body.quiz);
	quiz
		.validate()
			.then(
				function(err){
					if(err){
						res.render('quizes/new' , {quiz: quiz, errors: err.errors});
					}else{
						
						//guarda en BD los campos pregunta y respuesta quiz
						quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
						res.redirect('/quizes')})
						} //Redireccion Http (url relativo) lista de preguntas
					}
				);
};
