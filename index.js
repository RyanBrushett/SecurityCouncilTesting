var server = require("./app/control/server");
var router = require("./app/control/router");
server.start(router.route);
