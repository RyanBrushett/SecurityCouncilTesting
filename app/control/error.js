/* Useless error.js.
   I'm going to move this into the dispatcher when I get time.
*/
function fourohfour(req,res){
    console.log("404");
    res.writeHead(404,{"content-type":"text/plain"});
    res.write("404 page not found.");
    res.end();
}
exports.fourohfour = fourohfour;
