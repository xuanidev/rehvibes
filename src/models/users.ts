export interface User {
    id?: string,
    name: string;
    surname: string;
    username: string;
    mail: string;
}

export interface UserFromApi {
    id: string,
    name: string;
    surname: string;
    username: string;
    mail: string;
}

export interface SignUpData {
    name: string;
    surname: string;
    username: string;
    email: string;
    pass: string;
}
