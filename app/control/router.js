/* Here's the request router.
   Basically it parses the path and conditionally
   calls a function from the dispatcher.
   See dispatcher.js for more info on the dispatcher.
   Having the error handling separated was a dumb idea.
   I'm going to change that later.
*/

/* dispatcher.js and error.js are in this working dir*/
var dispatcher = require("./dispatcher");
var error      = require("./error");

/* Here's our route function.
   Basically it takes the path, checks it against a bunch of conditions
   and calls the appropriate dispatcher function based on what it finds.
   If it doesn't find anything useful, it throws a 404 Not Found
*/
function route(path,req,res){
    console.log("About to route a request for " + path);
    if (path == "" || path == "/" && req.method == "GET"){
        dispatcher.renderHello(req,res);
    }
    else if (path == "/login" && req.method == "GET"){
        dispatcher.renderLogin(req,res);
    }
    // Haven't done this part yet.
    /*else if (path == "/login" && req.method == "POST"){
        dispatcher.handleAuth(req,res);
    }*/
    else{
        error.fourohfour(req,res);
    }
}

/* Exporting the router */
exports.route = route;
