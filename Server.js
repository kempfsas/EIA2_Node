"use strict";
//Bindet Url Modul mit ein
const Url = require("url");
//HTTP Objekt wird im Code erstellt
//Interpreter sucht nach jedem m�glichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anh�ngen
const Http = require("http");
//namespace erstellen
var Node;
(function (Node) {
    let studis = {};
    // Todo: �ndern!
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port); //Server soll auf gewissen port lauschen und damit wird der event-Listener listening gefeuert
    function handleListen() {
        console.log("Hallo");
    }
    function handleRequest(_request, _response) {
        //Die Headers sind dazu da um von anderen Servern zugreifen zu k�nnen
        _response.setHeader('Access-Control-Allow-Origin', '*'); //* = alle; Sicherheitsfeature, jeder kann darauf zugreifen
        //_response.setHeader('Access-Control-Request-Method', '*'); //
        //Options: Um abzufragen, ob man auf den Server zugreifen kann
        //GET: Um Antwort zur�ck zu bekommen
        //_response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        //_response.setHeader('Access-Control-Allow-Headers', '*');
        //Aus string ein Objekt machen
        let query = Url.parse(_request.url, true).query;
        //console.log(query);
        _response.write("Hallo");
        //Schaut nach welche Methode angegeben wurde
        //Wenn die Methode addStudent ist f�ge Student zur Liste hinzu
        //Gebe als Antwort "Student added!"
        if (query["method"] == "addStudent") {
            let student = JSON.parse(query["data"].toString());
            studis[student.matrikel.toString()] = student;
            _response.write("Student added!");
        }
        else if (query["method"] == "refreshStudents") {
            _response.write(JSON.stringify(studis));
        }
        else if (query["method"] == "searchStudent") {
            let matrikel = query["data"].substring(1, query["data"].length - 1);
            let student = studis[matrikel];
            if (student != undefined) {
                _response.write(JSON.stringify(student));
            }
            else {
                _response.write("undefined");
            }
        }
        _response.end();
    }
})(Node || (Node = {}));
//# sourceMappingURL=Server.js.map