var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload de comandos con :quizID
router.param('quizId',quizController.load);
router.param('commentId', commentController.load);  // autoload :commentId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('new',                          quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

//se cambian por las de usuario

// Definición de rutas de cuenta
//router.get('/user',                        sessionController.loginRequired, quizController.new);     // formulario sign un
//router.post('/user',                       sessionController.loginRequired, quizController.create);     // registrar usuario
//router.get('/user/:userId(\\d+)/edit',     sessionController.loginRequired, quizController.edit);     // editar información de cuenta
//router.put('/user/:userId(\\d+)',          sessionController.loginRequired, quizController.update);     // actualizar información de cuenta
//router.delete('/user/:userId(\\d+)',       sessionController.loginRequired, quizController.destroy);     // borrar cuenta

//Rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',    commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',       commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	                                    sessionController.loginRequired, commentController.publish);

//Autor 
router.get('/author', function(req, res) {
res.render('author', { title: 'Autor' });
});


module.exports = router;
