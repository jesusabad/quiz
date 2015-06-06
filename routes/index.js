var express = require('express');
var router = express.Router();
// Añadimos la ruta del controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' }); // Cambiamos el de por defecto 'Express' por 'Quiz'
});
// Configuramos las rutas a question y answer
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
// Añadimos una nueva página para Créditos
router.get('/author', function(req, res) {
  res.render('author', {autor: 'Jesús Abad Luque'});
});

module.exports = router;
