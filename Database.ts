
import * as Mongo from "mongodb";
console.log("Database starting");

//import * as Server from "./Server";

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let students: Mongo.Collection;

// wenn wir auf heroku sind...
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://testuser:testpasswort1@ds253959.mlab.com:53959/database_mongodb_kempfsas";
    databaseName = "database_mongodb_kempfsas";
}

// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, handleConnect);


function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}

export function insert(_doc: Studi): void {
    students.insertOne(_doc, handleInsert);
}

function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}


export function findAll(_callback: Function): void {
    var cursor: Mongo.Cursor = students.find();
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, studentArray: Studi[]): void {
        if (_e) {
            _callback("Error" + _e);
        }
        else {
            let line: string = "";
            for (let i: number = 0; i < studentArray.length; i++) {
                line += studentArray[i].matrikel + ": " + studentArray[i].course + ", " + studentArray[i].name + ", " + studentArray[i].firstname + ", " + studentArray[i].age + ", ";
                line += studentArray[i].gender ? "male" : "female";
                line += "\n";
            }
            
            _callback(line);
            
            }
        
    }
}

export function findStudent(searchedMatrikel: number, _callback: Function): void {
    var myCursor: Mongo.Cursor = students.find({ "matrikel": searchedMatrikel }).limit(1);
    myCursor.next(prepareStudent);

    function prepareStudent(_e: Mongo.MongoError, studi: Studi): void {
        if (_e) {
            _callback("Error" + _e);
        }

        if (studi) {
            let line: string = studi.matrikel + ": " + studi.course + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female";
            _callback(line);
        } else {
            _callback("No Match");
        }
    }
}

/*export function findStudent(_callback: Function, matrikel: number) {
    let cursor: Mongo.Cursor = students.find({"matrikel": matrikel});
    cursor.toArray((_e: Mongo.MongoError, _result: Server.Studi[]) => {
        if (_e)
            _callback("Ich mag Fehler nicht :( " + _e, false);
        else {
            if (_result.length >= 1) {
                _callback(JSON.stringify(_result[0]), true)
            }
        }
    })
}*/