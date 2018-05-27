//In Gruppenarbeit erstellt
var Aufgabe6;
(function (Aufgabe6) {
    window.addEventListener("load", init);
    let address = "https://eia2node257180.herokuapp.com/";
    function init(_event) {
        console.log("Init");
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("search");
        let exampleButton = document.getElementById("exampleData");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
        exampleButton.addEventListener("click", exampleData);
    }
    function exampleData() {
        for (let i = 0; i < 3; i++) {
            //Zugriff auf Interface
            let student = {
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                course: "OMB"
            };
            //Funktion sendDataToHost, Variable student wird �bergeben
            sendDataToHost("addStudent", student);
        }
    }
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let matrikel = inputs[2].value;
        let courseSelect = document.getElementById("options");
        let studi;
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            course: inputs[3].value,
            age: parseInt(inputs[4].value),
            gender: genderButton.checked
        };
        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);
        console.log(studi.course);
        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        Aufgabe6.studiHomoAssoc[matrikel] = studi;
        // nur um das auch noch zu zeigen...
        Aufgabe6.studiSimpleArray.push(studi);
        console.log(Aufgabe6.studiSimpleArray);
        sendDataToHost("addStudent", studi);
    }
    function refreshStudents(_event) {
        sendDataToHost("refreshStudents");
    }
    function refresh() {
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
        for (let matrikel in Aufgabe6.studiHomoAssoc) {
            let studi = Aufgabe6.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            output.value += line + "\n";
        }
    }
    function search(_event) {
        let output = document.getElementsByTagName("textarea")[1];
        output.value = "";
        let inputs = document.getElementsByTagName("input");
        let matrikel = inputs[2].value;
        console.log(matrikel);
        let studi = Aufgabe6.studiHomoAssoc[matrikel];
        console.log(studi);
        if (typeof studi === "undefined") {
            output.value = "No student data found.";
        }
        else {
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre " + ", " + studi.course;
            line += studi.gender ? ", (M)" : ", (F)";
            output.value += line + "\n";
        }
    }
    // zusätzliche Konsolenausgaben zur Demonstration
    console.group("Simple Array");
    console.log(Aufgabe6.studiSimpleArray);
    console.groupEnd();
    console.group("Associatives Array (Object)");
    console.log(Aufgabe6.studiHomoAssoc);
    console.groupEnd();
    function sendDataToHost(method, data = undefined) {
        console.log("Sending data to host..");
        let xhr = new XMLHttpRequest();
        let dataString = JSON.stringify(data);
        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true);
        if (method == "addStudent") {
            xhr.onload = function () {
                console.log(xhr.responseText);
            };
        }
        else if (method == "refreshStudents") {
            xhr.onload = function () {
                console.log('Refreshing Students...');
                Aufgabe6.studiHomoAssoc = JSON.parse(xhr.responseText);
                refresh();
            };
        }
        xhr.send();
    }
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=Aufgabe6.2.js.map