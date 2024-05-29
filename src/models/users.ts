import { SurveyData } from "./surveys";

export interface User {
    uid: string,
    name: string;
    email: string;
    google_id: boolean;
    patient_profile?: SurveyData
    programs: string[];
}

export interface UserFromApi {
    id: string,
    name: string;
    surname: string;
    username: string;
    mail: string;
    programs: string[];
}

export interface SignUpData {
    name: string;
    surname: string;
    username: string;
    email: string;
    pass: string;
}
