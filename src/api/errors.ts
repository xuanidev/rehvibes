export const errors = {
    generalMsg: "Ha ocurrido un error con tu inicio de sesión, vuelva a intentarlo más tarde por favor",
    emailMsg: "El correo indicado ya tiene una cuenta asignada.",
    invalidMsg: 'El correo introducido no es válido.',
    weakPassMsg: 'La contraseña introducida es demasiado débil.',
    credentialMsg: 'Las credenciales introducidas ya están siendo utilizadas en otro usuario.',
  };

export const handleErrorMessage = (message: string):string =>{
    switch(message){
        case 'auth/email-already-in-use':
            console.log(message);
            return errors.emailMsg;
        case 'auth/invalid-email':
            return errors.invalidMsg;
        case 'auth/operation-not-allowed':
            return errors.generalMsg;
        case 'auth/weak-password':
            return errors.weakPassMsg;
        case 'auth/credential-already-in-use':
            return errors.credentialMsg;
        default:
            return errors.generalMsg;
    }
}