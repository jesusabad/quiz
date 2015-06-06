var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' }); // Cambiamos el de por defecto 'Express' por 'Quiz'
});

module.exports = router;
