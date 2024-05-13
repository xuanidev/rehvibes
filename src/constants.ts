import { ToastOptions, ToastPosition } from "react-toastify";

const days = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

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
    autoClose: 4000,
    draggable: true,
    style: {
      fontFamily: "Satoshi-Medium",
      color: "black",
      border: "1px solid white",
      backgroundColor: "hsla(0, 0%, 100%, 0.95)",
      borderRadius: "12px",
    },
  };

export {days, months, toastError} 
