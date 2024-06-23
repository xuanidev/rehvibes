import { Switch, SwitchOff } from '../icons';
import './optionExtended.scss';

interface OptionExtendedProps {
  type: 'button' | 'switch' | 'switchOff' | 'select';
  text: string;
  textButton?: string;
}

export const OptionExtended = (props: OptionExtendedProps) => {
  const { type, text, textButton } = props;
  return (
    <div className="option_extended">
      <p className="option_extended__text">{text}</p>
      {type === 'button' ? (
        <button className="option_extended__button">{textButton}</button>
      ) : type === 'switch' ? (
        <Switch className="switch" />
      ) : type === 'switchOff' ? (
        <SwitchOff className="switch" />
      ) : type === 'select' ? (
        <button className="option_extended__button_down">{textButton}</button>
      ) : null}
    </div>
  );
};
export default OptionExtended;
