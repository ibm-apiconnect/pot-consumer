var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  if (typeof req.cookies.config !== 'undefined') {
    res.render('index', {title: 'ThinkIBM Consumer'});
  } else {
    res.redirect('/config');
  }

});

module.exports = router;