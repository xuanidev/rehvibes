import { ToastOptions, ToastPosition } from "react-toastify";

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];


const toastError: ToastOptions<ToastPosition> = {
    position: "top-center",
    hideProgressBar: true,
    closeOnClick: true,
    autoClose: 5000,
    draggable: true,
    style: {
      fontFamily: "Satoshi-Regular",
      color: "black",
      border: "1px solid #E53E00",
      borderRadius: "12px",
    },
  };

export {months, toastError} 
