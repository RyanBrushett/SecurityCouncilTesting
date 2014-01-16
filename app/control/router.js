var dispatcher = require("./dispatcher");
var error      = require("./error");

function route(path,req,res){
    console.log("About to route a request for " + path);
    if (path == "" || path == "/" && req.method == "GET"){
        dispatcher.renderHello(req,res);
    }
    else if (path == "/login" && req.method == "GET"){
        dispatcher.renderLogin(req,res);
    }
    /*else if (path == "/login" && req.method == "POST"){
        dispatcher.handleAuth(req,res);
    }*/
    else{
        error.fourohfour(req,res);
    }
}

exports.route = route;
