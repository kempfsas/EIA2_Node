
import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";



let server: Http.Server;
let port: number = process.env.PORT;

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


function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse) {
    console.log("Request received");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    let query: AssocStringString = Url.parse(_request.url, true).query;
    var command: string = query["command"];
    console.log(query["command"]);

    if (query["command"]) {
        switch (query["command"]) {
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


function respond(_response: Http.ServerResponse, _text: string): void {
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

}*/


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
}