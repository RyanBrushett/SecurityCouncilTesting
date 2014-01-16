/* Robbed this from the Express samples but it doesn't actually
   use any express libraries. BEAUTY.
*/
var crypto = require('crypto');
var len = 128;
var iterations = 12000;

    // If the function takes three arguments, it'll check the has and salt.
    // If the function gets two arguments, it'll generate a salt and hash.
exports.hash = function (pwd, salt, fn) {
  if (3 == arguments.length) {
    crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
      fn(err, hash.toString('base64'));
    });
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt){
      if (err) return fn(err);
      salt = salt.toString('base64');
      crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
        if (err) return fn(err);
        fn(null, salt, hash.toString('base64'));
      });
    });
  }
};

    // Try to auth the user with password
exports.auth = function authenticate(name, pass, fn) {
   if (!module.parent) console.log('authenticating %s:%s', name, pass);
   var user = users[name];
   if (!user) return fn(new Error('cannot find user'));
   hash(pass, user.salt, function(err, hash){
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('invalid password'));
   });
}

/* Not sure this will work without express, however. This is
   from another express example for restriction access to
   certain functions. I believe we can make it work.
*/
    // Restrict a section of the app by session
exports.restrict = function restrict(req, res, next) {
   if (req.session.user) {
      next();
   } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
   }
}
*/
