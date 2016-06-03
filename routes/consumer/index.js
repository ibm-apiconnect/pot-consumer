var express = require('express');
var router = express.Router();
var session;

/* GET home page. */
router.get('/', function (req, res) {
  session = req.session;
  console.log("SESSION: " + JSON.stringify(session));

  if (typeof session.config !== 'undefined') {
    res.render('index', {title: 'ThinkIBM Consumer'});
  } else {
    res.redirect('/config');
  }

});

module.exports = router;