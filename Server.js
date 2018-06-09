"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
let server;
let port = process.env.PORT;
startServer();
function startServer() {
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
}
function handleListen() {
    console.log('listening on port ' + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    let query = Url.parse(_request.url, true).query;
    var command = query["command"];
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
function respond(_response, _text) {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//if (query["command"]) {
/*switch (query["command"]) {
    case "insert":
        Database.insert(JSON.parse(query["data"]));
        _response.end();
        break;

    case "findAll":
        Database.findAll(function(studis: string, worked: boolean) {
            if (worked) {
                _response.write(studis);
                _response.end();
            }

            else
                console.log(studis);
        });
        break;

    case "find":
        Database.findStudent(function (studi: string, worked: boolean) {
            if (worked){
                _response.write(studi);
                _response.end();
            }
            else
                console.log(studi);
        }, parseInt(query["data"]))
}
}

}


export interface Studi {
name: string;
firstname: string;
studiengang: string;
matrikel: number;
age: number;
gender: boolean;
}

export interface Studis {
[matrikel: string]: Studi;
}

export interface Object {
[key: string]: string;
}*/ 
//# sourceMappingURL=Server.js.map