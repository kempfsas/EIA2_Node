"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
let port = process.env.PORT;
if (port == undefined)
    port = 8200;
let server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);
function handleResponse(_response, _text) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}
function handleRequest(_request, _response) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    console.log("Ich h�re Stimmen!");
    let query = Url.parse(_request.url, true).query;
    console.log(query["command"]);
    if (query["command"]) {
        switch (query["command"]) {
            case "insert":
                insert(query, _response);
                break;
            case "refresh":
                refresh(_response);
                break;
            case "search":
                search(query, _response);
                break;
            default:
                error();
        }
    }
    _response.end();
}
function insert(query, _response) {
    let obj = JSON.parse(query["data"]);
    let _name = obj.name;
    let _firstname = obj.firstname;
    let matrikel = obj.matrikel.toString();
    let _age = obj.age;
    let _gender = obj.gender;
    let _course = obj.course;
    let studi;
    studi = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt(matrikel),
        age: _age,
        gender: _gender,
        course: _course
    };
    Database.insert(studi);
    handleResponse(_response, "Data received");
}
function refresh(_response) {
    Database.findAll(function (json) {
        handleResponse(_response, json);
    });
    /*for (let matrikel in studiHomoAssoc) {
            // for-in-Schleife iteriert �ber die Schl�ssel des assoziativen Arrays
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.course + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female";
            _response.write(line + "\n");
}*/
}
function search(query, _response) {
    /*let matrikelSearch: number = parseInt(query["searchFor"]);
    Database.findStudent(matrikelSearch, function(json: string): void {
        handleResponse(_response, json);
    });*/
}
function error() {
    //alert("Error");
}
/*function handleResponse(_response: Http.ServerResponse, _text: string): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}*/
//# sourceMappingURL=Server.js.map