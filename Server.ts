import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";

let port: number = process.env.PORT;
if (port == undefined)
    port = 8200;

let server: Http.Server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);

function handleResponse(_response: Http.ServerResponse, _text: string): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    console.log("Ich höre Stimmen!");
    let query: AssocStringString = Url.parse(_request.url, true).query;
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

function insert(query: AssocStringString, _response: Http.ServerResponse): void {
    let obj: Studi = JSON.parse(query["data"]);
    let _name: string = obj.name;
    let _firstname: string = obj.firstname;
    let matrikel: string = obj.matrikel.toString();
    let _age: number = obj.age;
    let _gender: boolean = obj.gender;
    let _course: string = obj.course;
    
    let studi: Studi;
    
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

function refresh(_response: Http.ServerResponse): void {
    Database.findAll(function(json: string): void {
        handleResponse(_response, json);
    });

    /*for (let matrikel in studiHomoAssoc) {
            // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.course + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female"; 
            _response.write(line + "\n");
}*/
}

function search(query: Object, _response: Http.ServerResponse): void {
    /*let matrikelSearch: number = parseInt(query["searchFor"]);
    Database.findStudent(matrikelSearch, function(json: string): void {
        handleResponse(_response, json);
    });*/
}

    
function error(): void {
    alert("Error");
}

/*function handleResponse(_response: Http.ServerResponse, _text: string): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}*/
