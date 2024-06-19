import Cookies from "js-cookie";
import { RehabilitationDay, RehabilitationProgramProps } from "../models";

export const saveOnLocalStorage = (name: string, value: string) =>{
    localStorage.setItem(name, value);
}
export const removeFromLocalStorage = (name: string) =>{
    localStorage.removeItem(name);
}
export const removeFromLocalStorageArray = (names: string[]) =>{
    names.forEach((name: string) => {
        localStorage.removeItem(name);
    })
}
export const getFromLocalStorage = (name: string):string =>{
    return localStorage.getItem(name) ?? '';
}
export const saveOnCookies = (name: string, value: string, path?: string ) =>{
    Cookies.set(name, value, { path: path ?? ''});
}
export const getFromCookies = (name: string):string =>{
    return Cookies.get(name) ?? '';
}
export const removeFromCookies = (names: string[]) =>{
    names.forEach((name: string) => {
        Cookies.remove(name);
    })
}

export const retrieveDates = (programs: RehabilitationProgramProps[], setRehabDays: (rehabDays: Date[]) => void) => {
    console.log(programs);
    const dates = [] as Date[];
    if (programs.length > 0) {
        programs.forEach((program: RehabilitationProgramProps) => {
        if (program.rehabilitation_program) {
            program.rehabilitation_program.forEach((days: RehabilitationDay) => {
            dates.push(new Date(days.date));
            });
        }
        });
    }
    saveOnLocalStorage('rehabdays', JSON.stringify(dates));
    setRehabDays(dates);
};