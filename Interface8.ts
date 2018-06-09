interface AssocStringString {
    [key: string]: string;
}

interface Studi {
    name: string;
    firstname: string;
    matrikel: number;
    course: string;
    age: number;
    gender: boolean;
}

interface Studis {
    [matrikel: string]: Studi;
}


let studiHomoAssoc: Studis = {};