var express = require('express');
var router = express.Router();
// Añadimos la ruta del controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] }); // Cambiamos el de por defecto 'Express' por 'Quiz'
});
// Autoload de comandos con :quizId
router.param( 'quizId', quizController.load );  // autoload :quizId
// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);
// Añadimos una nueva página para Créditos
router.get('/author', function(req, res) {
  res.render('author', { autor: 'Jesús Abad Luque', errors: [] });
});

module.exports = router;
