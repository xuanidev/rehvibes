export interface User {
    uid?: string,
    name: string;
    email: string;
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
