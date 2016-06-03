var express = require('express');
var router = express.Router();

/* GET request for login screen */
router.get('/', function (req, res) {

  res.clearCookie('config');
  res.clearCookie('oauth2token');
  res.redirect('/');
});

module.exports = router;