var http  = require("http");
var url   = require("url");
var users = require("../../db/users").users;
var hash  = require("../../db/pass").hash;

function start(route) {
   function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request received for " + pathname);
      route(pathname,request,response);
   }
   http.createServer(onRequest).listen(8888);
   console.log("Server has started on 8888.");
}

    // Hashing, salting their password
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

exports.start = start;
