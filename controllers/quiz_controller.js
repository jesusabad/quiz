var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error); } );
};

// GET /quizes
exports.index = function(req, res) {
  if (!req.query.search) { 
    models.Quiz.findAll().then(function(quizes){
      res.render( 'quizes/index.ejs', { quizes: quizes, errors: [] } );
    }
    ).catch(function(error) {next(error);})
  } else {
    // delimitar el string contenido en search con el comodín % antes y después cambie también
    // los espacios en blanco por %. De esta forma, si busca "uno dos" ("%uno%dos%"),
    // mostrará todas las preguntas que tengan "uno" seguido de "dos", independientemente
    // de lo que haya entre "uno" y "dos".
    models.Quiz.findAll(
      {
        where: [ "lower(pregunta) like lower(?)", "%"+req.query.search.split(" ").join("%")+"%" ]
      }).then( function(quizes) {
        res.render( 'quizes/index.ejs', { quizes: quizes.sort() } );
      }
    ).catch(function(error) {next(error);})
  };
}

// GET /quizes/:id
exports.show = function(req, res) {
  res.render( 'quizes/show', { quiz: req.quiz, errors: [] } );
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if ( req.query.respuesta === req.quiz.respuesta ) {
    resultado = '¡Correcto!';
  }
  res.render( 'quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] } );
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( 
    { pregunta: "Texto de la nueva pregunta", respuesta: "Texto con su respuesta correcta" }
  );
  res.render( 'quizes/new', { quiz: quiz, errors: [] } );
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else { // save: guarda en DB campos pregunta y respuesta de quiz
        quiz.save( { fields: [ "pregunta", "respuesta" ] } ).then( function() {
          res.redirect('/quizes');  
        })     // res.redirect: Redirección HTTP a lista de preguntas
      }
    }
  );
};