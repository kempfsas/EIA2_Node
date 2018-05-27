
//In Gruppenarbeit erstellt

namespace Aufgabe6 {
    window.addEventListener("load", init);

    let address: string = "https://eia2node257180.herokuapp.com/";

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("search");

        let exampleButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("exampleData");

        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
        exampleButton.addEventListener("click", exampleData);
    }

    function exampleData() {
        for (let i = 0; i < 3; i++) {

            //Zugriff auf Interface

            let student: Aufgabe6.Studi = {
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                course: "OMB"
            }

            //Funktion sendDataToHost, Variable student wird �bergeben

            sendDataToHost("addStudent", student)
        }
    }


    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        let matrikel: string = inputs[2].value;
        let courseSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("options");
        let studi: Studi;
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
        studiHomoAssoc[matrikel] = studi;

        // nur um das auch noch zu zeigen...
        studiSimpleArray.push(studi);
        console.log(studiSimpleArray);

        sendDataToHost("addStudent", studi);
    }

    function refreshStudents(_event: Event): void {
        sendDataToHost("refreshStudents");
    }



    function refresh(): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        output.value = "";
        // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
        for (let matrikel in studiHomoAssoc) {  // Besonderheit: Type-Annotation nicht erlaubt, ergibt sich aus der Interface-Definition
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            output.value += line + "\n";
        }
    }



    function search(_event: Event): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
        output.value = "";
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let matrikel: string = inputs[2].value;
        console.log(matrikel);
        let studi: Studi = studiHomoAssoc[matrikel];
        console.log(studi);
        if (typeof studi === "undefined") {
            output.value = "No student data found.";
        } else {
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre " + ", " + studi.course;
            line += studi.gender ? ", (M)" : ", (F)";
            output.value += line + "\n";
        }
    }
    // zusätzliche Konsolenausgaben zur Demonstration
    console.group("Simple Array");
    console.log(studiSimpleArray);
    console.groupEnd();

    console.group("Associatives Array (Object)");
    console.log(studiHomoAssoc);
    console.groupEnd();


    function sendDataToHost(method: string, data: any = undefined) {
        console.log("Sending data to host..");
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let dataString: string = JSON.stringify(data);
        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true);
        if (method == "addStudent") {
            xhr.onload = function() {
                console.log(xhr.responseText)
            }
        }
        else if (method == "refreshStudents") {
            xhr.onload = function() {
                console.log('Refreshing Students...');
                studiHomoAssoc = JSON.parse(xhr.responseText);
                refresh();
            }
        }
        xhr.send();
    }

}
