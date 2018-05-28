//Bindet Url Modul mit ein
import * as Url from "url";

//HTTP Objekt wird im Code erstellt
//Interpreter sucht nach jedem m�glichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anh�ngen
import * as Http from "http";

//namespace erstellen
namespace Node {
    let studis: Aufgabe6.Studis = {};

    interface AssocStringString {
        [key: string]: string | string[];
    }

    // Todo: �ndern!
    let port: number = process.env.PORT;

    if ( port == undefined ) 
        port = 8100; 

    let server: Http.Server = Http.createServer();
    server.addListener( "listening", handleListen );

    server.addListener( "request", handleRequest );
    server.listen( port ); //Server soll auf gewissen port lauschen und damit wird der event-Listener listening gefeuert


    function handleListen(): void {
        console.log("Hallo");
    }

    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
        
        //Die Headers sind dazu da um von anderen Servern zugreifen zu k�nnen
        
        _response.setHeader('Access-Control-Allow-Origin', '*'); //* = alle; Sicherheitsfeature, jeder kann darauf zugreifen
        _response.setHeader('Access-Control-Request-Method', '*'); //
        
        //Options: Um abzufragen, ob man auf den Server zugreifen kann
        //GET: Um Antwort zur�ck zu bekommen
        
         _response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        _response.setHeader('Access-Control-Allow-Headers', '*');
        
        //Aus string ein Objekt machen
        let query: AssocStringString = Url.parse(_request.url, true).query;
        //console.log(query);
        
        _response.write("Hallo");
        
        
        //Schaut nach welche Methode angegeben wurde
        //Wenn die Methode addStudent ist f�ge Student zur Liste hinzu
        //Gebe als Antwort "Student added!"
        if (query["method"] == "addStudent") {
            let student = <Aufgabe6.Studi>JSON.parse(query["data"].toString());
            studis[student.matrikel.toString()] = student;
            _response.write("Student added!");
            //_response.end();
        }

        //Wenn die Methode refreshStudents ist, gebe die Liste der Studenten als Antwort
        //stringify: Objekt wird zum string
        if (query["method"] == "refreshStudents") {
            _response.write(JSON.stringify(studis));
            //_response.end();
        }
        
        _response.end();
    }
}