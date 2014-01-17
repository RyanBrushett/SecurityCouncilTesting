/* This is the main class. 
   We import the start function from app/control/server
   We also import the router and pass it to server start
   See app/control/server.js for server config
   See app/control/router.js for the request router.
*/
var server = require("./app/control/server");
var router = require("./app/control/router");
server.start(router.route);
