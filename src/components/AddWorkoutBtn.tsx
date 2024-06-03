import { useState } from 'react';
import { Btn } from './index.js';
import Plus from './icons/Plus.tsx';
import './addWorkoutBtn.scss';

export const AddWorkoutBtn = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Btn
        btnClass="borderGradient"
        leftIcon={Plus}
        iconHeight={24}
        iconWidth={24}
        iconClass="color-brand icon"
        text="Añadir nuevo entrenamiento"
        onClick={openModal}
      />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <h2>Añadir nuevo entrenamiento</h2>
            {
              <div className="">
                <input type="text" placeholder="Buscar ejercicios" />
                <button>Añadir ejercicio</button>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default AddWorkoutBtn;
