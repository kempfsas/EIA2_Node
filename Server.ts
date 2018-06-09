import * as Database from "./Database";
import * as Http from "http";
import * as Url from "url";


let server: Http.Server;
let port: number = process.env.PORT;

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



function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    let query: Object = Url.parse(_request.url, true).query;
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