/* Here's our dispatcher!
   This takes the routed request from our router.js
   and reads/serves the appropriate HTML page based
   on that routing rule.
   We import the node fs library which is used to read
   the file system. Util is a utility library that I
   don't make use of in this file so I should remove it.
   URL is the url parser. I don't think I use that either.
   These are all built-in node utilities.
*/
var fs   = require('fs');
var util = require('util');
var url  = require('url');
var path = require('path');
/* This is the directory views are stored in */
var view = './app/view/';

/* We use these to handle static files */
var contentTypes = {
    '.html':'text/html',
    '.css' :'text/css',
    '.js'  :'application/javascript'
};

/* I have a header file so that we don't need to constantly
   recreate a navbar and the HTML header. This way, when writing
   the HTML views, we only need to finish the body. It will cut
   down a lot on typing.
*/
var headerFile;
var headerLoc = view + 'header.html';
fs.readFile(headerLoc,function(err,page){
    headerFile = page;
});

/* My render functions are here.
   These log the render, read the file system for the
   appropriate HTML file, and put it in the response.
   They then end the response, triggering the chain of
   callbacks so the user can see the page.
*/
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

function staticFile(filename,req,res){
    fs.readFile(filename,"binary",function(err,file){
        if(err){
            res.writeHead(500,{"Content-Type":"text/plain"});
            res.write(err + "\n");
            res.end();
            return;
        }
        var headers = {};
        var ct = contentTypes[path.extname(filename)];
        if(ct){
            headers["Content-Type"] = ct;
        }
        res.writeHead(200,headers);
        res.write(file,"binary");
        res.end();
    });
}
/* These will be the handle functions for taking POST requests.
   So far I haven't finished this and it doesn't work. It's just
   here for notes. I don't believe I can use req.session without
   a framework and havne't tried it yet.
*/
/*function handleAuth(req,res){
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
});*/

/* Need to export the functions */
exports.renderHello = renderHello;
exports.renderLogin = renderLogin;
exports.staticFile  = staticFile;
