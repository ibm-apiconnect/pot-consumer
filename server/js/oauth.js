var Promise = require('promise');
var UrlPattern = require('url-pattern');
var ClientOAuth2 = require('client-oauth2');
var config = require('config');

var api_url = new UrlPattern('(:host)(:api)(:operation)');
var _apis = config.get('APIs');

module.exports.login = function (username, password, config, existingToken) {
  console.log("config cookie: " + JSON.stringify(config));
  console.log("oauth2token cookie: " + existingToken);

  return new Promise(function (fulfill, reject) {
    if (typeof existingToken !== "undefined") {
      console.log("Using Existing OAuth Token: " + existingToken);
      fulfill(existingToken);
    }
    else {

      var authz_url = api_url.stringify({
        host: config.apic_uri,
        api: _apis.oauth20.base_path,
        operation: _apis.oauth20.paths.authz
      });
      console.log("authz_url: " + authz_url);

      var token_url = api_url.stringify({
        host: config.apic_uri,
        api: _apis.oauth20.base_path,
        operation: _apis.oauth20.paths.token
      });
      console.log("token_url: " + token_url);

      var thinkAuth = new ClientOAuth2({
        clientId: config.client_id,
        clientSecret: config.client_secret,
        accessTokenUri: token_url,
        authorizationUri: authz_url,
        authorizationGrants: _apis.oauth20.grant_types,
        redirectUri: _apis.oauth20.redirect_url,
        scopes: _apis.oauth20.scopes
      });

      // Set an option to disable the check for self-signed certificates
      var options = {
        options: {
          rejectUnauthorized: false
        }
      };

      thinkAuth.owner.getToken(username, password, options)
        .then(function (user) {
          console.log("Using OAuth Token: " + user.accessToken);
          fulfill(user.accessToken);
        })
        .catch(function (reason) {
          reject(reason);
        });
    }
  });

};