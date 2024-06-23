import './newRoutinesImage.scss';
import Btn from './Btn';
import ImgDefault from '../assets/pecho.png';
import { useModal } from '../contexts/ModalContext';
import ModalExercise from './ModalExercise';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const NewRoutines = () => {
  const { showModalExercise, setShowModalExercise } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (showModalExercise) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scroll is reset if component unmounts
    };
  }, [showModalExercise]);
  return (
    <div className="new_routines_img_container">
      <h3 className="new_routines_img_container__tittle">Échale un ojo a este ejericio</h3>
      <div className="new_routines_img_container__info">
        <div className="new_routines_img_container__img_container">
          <div className="new_routines_img_container__img_container__text">
            <p className="new_routines_img_container__img_container__text_tittle">Ejercicio de pecho</p>
            <p className="new_routines_img_container__img_container__text_level">Nivel Básico</p>
          </div>
          <img
            className="new_routines_img_container__img"
            src={ImgDefault}
            onClick={() => setShowModalExercise(true)}
          ></img>
        </div>
        <Btn btnClass="borderGradient heighFit" text="Explorar" onClick={() => navigate('library')} />
        {showModalExercise && <ModalExercise id={10} />}
      </div>
    </div>
  );
};

export default NewRoutines;
