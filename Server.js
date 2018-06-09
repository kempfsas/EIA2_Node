"use strict";
const Database = require("./Database");
const Http = require("http");
const Url = require("url");
let server;
let port = process.env.PORT;
startServer();
function startServer() {
    if (port == undefined)
        port = 8100;
    server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    console.log('listening on port ' + port);
    server.listen(port);
}
function handleListen() {
    console.log("Ich hoere...");
}
function handleRequest(_request, _response) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    let query = Url.parse(_request.url, true).query;
    console.log(query["command"]);
    if (query["command"]) {
        switch (query["command"]) {
            case "insert":
                Database.insert(JSON.parse(query["data"]));
                _response.end();
                break;
            case "findAll":
                Database.findAll(function (studis, worked) {
                    if (worked) {
                        _response.write(studis);
                        _response.end();
                    }
                    else
                        console.log(studis);
                });
                break;
            case "find":
                Database.findStudent(function (studi, worked) {
                    if (worked) {
                        _response.write(studi);
                        _response.end();
                    }
                    else
                        console.log(studi);
                }, parseInt(query["data"]));
        }
    }
}
//# sourceMappingURL=Server.js.map