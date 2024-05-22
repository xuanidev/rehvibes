import { ToastOptions, ToastPosition } from "react-toastify";

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

const bodyPartsMap = {
  'Cuello': ['neck'],
  'Muñeca': ['forearm'],
  'Hombro': ['back-deltoids', 'front-deltoids'],
  'Rodilla': [''],
  'Espalda': ['trapezius', 'upper-back', 'lower-back'],
  'Pie': [''],
  'Cadera': ['abductors', 'adductor'],
  'Tobillo': ['calves'],
  'Codo': ['biceps', 'triceps'],
  'Columna vertebral': ['upper-back', 'lower-back'],
  'Lumbar': ['lower-back'],
  'Isquios': ['hamstring'],
  'Pelvis': ['adductor', 'abductors'],
  'Pectoral': ['chest'],
  'Tobillos': ['calves'],
  'Pies': [''],
  'Gluteos': ['gluteal']
};

export {toastError, bodyPartsMap} 
