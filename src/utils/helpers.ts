import Cookies from "js-cookie";

export const saveOnLocalStorage = (name: string, value: string) =>{
    localStorage.setItem(name, value);
}
export const removeFromLocalStorage = (name: string) =>{
    localStorage.removeItem(name);
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