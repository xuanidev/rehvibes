import React, { useState } from 'react';
import { Switch, SwitchOff } from '../icons';
import './optionExtended.scss';

interface OptionExtendedProps {
  type: 'button' | 'switch' | 'switchOff' | 'select';
  text: string;
  textButton?: string;
  leftButtonText?: string;
}

export const OptionExtended = (props: OptionExtendedProps) => {
  const { type, text, textButton, leftButtonText } = props;
  const [isSwitchOn, setIsSwitchOn] = useState(type !== 'switchOff'); // initial state based on type

  const handleSwitchClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation(); // Stop the event from propagating to the parent
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="option_extended">
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
        ) : null}
      </div>
    </div>
  );
};

export default OptionExtended;
