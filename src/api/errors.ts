export const errorsSignup = {
    generalMsg: "Ha ocurrido un error con tu registro, vuelva a intentarlo más tarde por favor",
    emailMsg: "El correo indicado ya tiene una cuenta asignada.",
    invalidMsg: 'El correo introducido no es válido.',
    weakPassMsg: 'La contraseña introducida es demasiado débil.',
    credentialMsg: 'Las credenciales introducidas ya están siendo utilizadas en otro usuario.',
    correoUsado: 'El correo indicado ya ha sido utilizado en otro modo de registro.'
  };

export const handleErrorMessageSignup = (message: string):string =>{
    switch(message){
        case 'auth/email-already-in-use':
            console.log(message);
            return errorsSignup.emailMsg;
        case 'auth/invalid-email':
            return errorsSignup.invalidMsg;
        case 'auth/operation-not-allowed':
            return errorsSignup.generalMsg;
        case 'auth/correo-usado':
            return errorsSignup.correoUsado;
        case 'auth/weak-password':
            return errorsSignup.weakPassMsg;
        case 'auth/credential-already-in-use':
            return errorsSignup.credentialMsg;
        default:
            return errorsSignup.generalMsg;
    }
}

export const errorsLogin = {
    generalMsg: "Ha ocurrido un error con el login, vuelva a intentarlo más tarde por favor",
    notFoundMsg: "No existe ningún registro para el usuario indicado",
    tooManyMsg: 'La cantidad de intentos fallidos ha sido superada',
    wrongPassMsg: 'La contraseña no es correcta',
    invalidCredentialMsg: 'Indique un usuario y contraseña que existan',
    correoUsado: 'El correo indicado ya ha sido utilizado en otro modo de registro.'
};

export const handleErrorMessageLogin = (message: string):string =>{
    switch(message){
        case 'auth/user-not-found':
            return errorsLogin.notFoundMsg;
        case 'auth/too-many-requests':
            return errorsLogin.tooManyMsg;
        case 'auth/operation-not-allowed':
            return errorsLogin.generalMsg;
        case 'auth/wrong-password':
            return errorsLogin.wrongPassMsg;
        case 'auth/invalid-credential':
            return errorsLogin.invalidCredentialMsg;
        case 'auth/correo-usado':
            return errorsLogin.correoUsado;
        default:
            return errorsLogin.generalMsg;
    }
}
export const errorsLoginGoogle = {
    generalMsg: "Algo ha ido mal con el login de Google, vuelva a intentarlo por favor.",
    errorCrearUsuarioMsg: "Hemos tenido un problema con la creacíon de su usuario, vuelva a intentarlo más tarde por favor."
};

