/* We import the node http and URL built-in libraries.
   We also grab the users (doesn't do much at this point)
   We also grab the hash function from pass.js
   Both users.js and pass.js are in <app root>/db
*/
var http  = require("http");
var url   = require("url");
var users = require("../../db/users").users;
var hash  = require("../../db/pass").hash;

/* Here's our server start function.
   We parse the request, log the path in the console,
   and then pass the request to the router for handling.
   THe server is created on 8888 and we note so.
*/
function start(route) {
   function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request received for " + pathname);
      route(pathname,request,response);
   }
   http.createServer(onRequest).listen(8888);
   console.log("Server has started on 8888.");
}

/* This uses the hash function to hash and salt
   a password. Right now, the password is hard coded
   and is 'password', 'catnip', and 'AHH!CATNIP'
   accordingly. There's no reason why these couldn't
   be passed in a POST request later on.
*/
hash('password',function(err,salt,hash){
    if (err) throw err;
    users.ryan.salt = salt;
    users.ryan.hash = hash;
});
hash('catnip',function(err,salt,hash){
    if (err) throw err;
    users.dexter.salt = salt;
    users.dexter.hash = hash;
});
hash('AHH!CATNIP',function(err,salt,hash){
    if (err) throw err;
    users.basil.salt = salt;
    users.basil.hash = hash;
});

/* Exporting the start function */
exports.start = start;
