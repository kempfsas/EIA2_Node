"use strict";
const Mongo = require("mongodb");
console.log("Database starting");
//import * as Server from "./Server";
let databaseURL = "mongodb://localhost:27017";
let databaseName = "Test";
let db;
let students;
// wenn wir auf heroku sind...
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://testuser:testpasswort1@ds253959.mlab.com:53959/database_mongodb_kempfsas";
    databaseName = "database_mongodb_kempfsas";
}
// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
/*export function findAll(_callback: Function): void {
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
}*/
function findStudent(searchedMatrikel, _callback) {
    var myCursor = students.find({ "matrikel": searchedMatrikel }).limit(1);
    myCursor.next(prepareStudent);
    function prepareStudent(_e, studi) {
        if (_e) {
            _callback("Error" + _e);
        }
        if (studi) {
            let line = studi.matrikel + ": " + studi.course + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female";
            _callback(line);
        }
        else {
            _callback("No Match");
        }
    }
}
exports.findStudent = findStudent;
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
//# sourceMappingURL=Database.js.map