var fs   = require('fs');
var util = require('util');
var url  = require('url');
var view = './app/view/';

var headerFile;
var headerLoc = view + 'header.html';
fs.readFile(headerLoc,function(err,page){
    headerFile = page;
});

function renderHello(req,res){
    console.log(req.url);
    filename = view + 'index.html';
    fs.readFile(filename, function(err,page){
        res.writeHead(200,{'content-type':'text/html'});
        res.write(headerFile + page);
        res.end();
    });
}

function renderLogin(req,res){
    console.log(req.url);
    filename = view + 'login.html';
    fs.readFile(filename, function(err,page){
        res.writeHead(200,{'content-type':'text/html'});
        res.write(headerFile + page);
        res.end();
    });
}

/*
function handleAuth(req,res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.regenerate(function(){
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name;
        res.redirect('/index');
      });
    } else {
      req.session.error = 'Authentication failed';
      res.redirect('/login');
    }
  });
});
*/

exports.renderHello = renderHello;
exports.renderLogin = renderLogin;
