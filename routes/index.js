var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. revisar */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizID
router.param('quizId',quizController.load);

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('new', quizController.new);
router.post('/quizes/create', quizController.create);

//Autor 
router.get('/author', function(req, res) {
res.render('author', { title: 'Autor' });
});


module.exports = router;
