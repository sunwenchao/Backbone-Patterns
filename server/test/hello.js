var http = require('http');

http.createServer(function (request, response) {
	var url = require("url");
	var fs = require("fs");
	var path = require("path");
	var mime = require("../config/mime.js").types;

    var pathname = url.parse(request.url).pathname;
    var searchname = url.parse(request.url).search;
    var realPath = "./content" + pathname;

    fs.exists(realPath, function (exists) {
    	
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write("This request URL " + pathname + " was not found on this server.");  
            response.end();
        } else {       
        	fs.readFile(realPath, "binary", function (err, file) {
            	if (err) {          
            	    response.writeHead(500, { 'Content-Type': 'text/plain' });      
            	    response.end(err);
            	} else {
            		var ext = path.extname(realPath);
            		ext = ext ? ext.slice(1) : 'unknown';
            		var contentType = mime[ext] || "text/plain";

                    // 支持sleep调试
                    var waitBoolean = getQuery( 'sleep', searchname );
                    if( waitBoolean ){
                        setTimeout(function(){
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.write(file, "binary");
                            response.end();
                        }, waitBoolean * 1000);
                    }else{
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.write(file, "binary");
                        response.end();
                    }
            	}
            });         
        }     
    });
}).listen(8888, "127.0.0.1");

function getQuery(name,pathStr){
    if( !pathStr ) return false;
    var reg = new RegExp( "(^|&)" + name + "=([^&]*)(&|$)" );
    var r = pathStr.substr( 1 ).match( reg );
    return r != null ? r[ 2 ] : "";
}

console.log('Server running at http://127.0.0.1:8888/');