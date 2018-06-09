interface AssocStringString {
    [key: string]: string;
}

interface Studi {
    name: string;
    firstname: string;
    matrikel: number;
    studiengang: string;
    age: number;
    gender: boolean;
}

interface Studis {
    [matrikel: string]: Studi;
}

let studiSimpleArray: Studi[] = [];

let studiHomoAssoc: Studis = {};