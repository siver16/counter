var http = require("http");
var mysql = require('mysql');
var url = require("url");
var server=http.createServer(function(req, res) {
    var connection = mysql.createConnection({"host":"localhost","user":"root","password":"*****","database":"counter"});
    connection.connect();
    var parsedUrl = url.parse(req.url, true);
    connection.query("SELECT value FROM counter",function(err, ress){
        var sum=ress[0].value;
        switch(parsedUrl.pathname){
            case '/tick':
                var addValue=0;
                if(parsedUrl.query.n){
                    sum+=+parsedUrl.query.n;
                    connection.query("UPDATE counter SET value ="+sum,function(err, ress){
                        res.end("Sum="+sum);
                        connection.end();
                    });
                }
                break;
            case '/show':
                res.end("Sum="+sum);
                connection.end();
                break;
        }
    });
});
server.listen(3000);