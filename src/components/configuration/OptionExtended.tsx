import React, { useState } from 'react';
import { Switch, SwitchOff } from '../icons';
import './optionExtended.scss';
import { useModal } from '../../contexts/ModalContext';
import { Modal } from '../Modal';

interface OptionExtendedProps {
  type: 'button' | 'switch' | 'switchOff' | 'select' | 'delete';
  text: string;
  textButton?: string;
  leftButtonText?: string;
}

export const OptionExtended = (props: OptionExtendedProps) => {
  const { type, text, textButton, leftButtonText } = props;
  const [isSwitchOn, setIsSwitchOn] = useState(type !== 'switchOff'); // initial state based on type
  const { showModal, setShowModal } = useModal();

  const handleSwitchClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation(); // Stop the event from propagating to the parent
    setIsSwitchOn(!isSwitchOn);
  };

  const cancelNavigation = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <div className="option_extended">
      {showModal && (
        <Modal
          onConfirm={cancelNavigation}
          onCancel={cancelNavigation}
          text="¿Estás seguro de eliminar su cuenta? Este cambio será irreversible."
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}
      <p className="option_extended__text">{text}</p>
      <div className="option_extended__right">
        <span className="option_extended__span">{leftButtonText}</span>
        {type === 'button' ? (
          <button className="option_extended__button">{textButton}</button>
        ) : type === 'switch' || type === 'switchOff' ? (
          isSwitchOn ? (
            <Switch className="switch" onClick={handleSwitchClick} />
          ) : (
            <SwitchOff className="switch" onClick={handleSwitchClick} />
          )
        ) : type === 'select' ? (
          <button className="option_extended__button_down">{textButton}</button>
        ) : type === 'delete' ? (
          <button className="option_extended__button_down" onClick={handleDelete}>
            {textButton}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OptionExtended;
