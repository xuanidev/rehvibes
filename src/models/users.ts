import { SurveyData } from "./surveys";

export interface cualidadesUser {
    text: string,
    percentage:number,
}
export interface User {
    uid: string,
    name: string;
    email: string;
    google_id: boolean;
    patient_profile?: SurveyData
    programs: string[];
    cualidades: cualidadesUser[];
    horas: number,
    logros: number,
    sesiones: number,
}

export interface UserFromApi {
    id: string,
    name: string;
    surname: string;
    username: string;
    mail: string;
    programs: string[];
    cualidades: cualidadesUser[];
    horas: number,
    logros: number,
    sesiones: number,
}

export interface SignUpData {
    name: string;
    surname: string;
    username: string;
    email: string;
    pass: string;
}

export interface RoutineInfo {
    description: string;
    difficulty: string;
    totalTimeWeeks: string;
    totalTimeHours: string;
    mainAreas: string[];
}