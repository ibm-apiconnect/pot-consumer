var express = require('express');
var router = express.Router();
var Promise = require('promise');
var oauth = require('../../server/js/oauth.js');

/* GET request for login screen */
router.get('/', function (req, res) {

  // render the login page
  res.render('login', {
    title: 'ThinkIBM Consumer'
  });

});

/* PROCESS POST request for login */
router.post('/', function (req, res) {

  loginWithOAuth(req, res)
    .then(renderPage)
    .catch(renderErrorPage)
    .done();

});

function loginWithOAuth(req, res) {
  var form_body = req.body;
  var username = form_body.username;
  var password = form_body.password;

  return new Promise(function (fulfill) {
    oauth.login(username, password, req.cookies.config, req.cookies.oauth2token)
      .then(function (token) {
        res.cookie('oauth2token', token);
        fulfill(res);
      })
      .done();
  });

}

function renderPage(res) {
  // Redirect to the inventory view
  res.redirect('/inventory');
}

function renderErrorPage(function_input) {
  var err = function_input.err;
  var res = function_input.res;
  res.render('error', {reason: err});
}

module.exports = router;