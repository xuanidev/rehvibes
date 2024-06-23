import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { RightArrow } from '../icons';
import './configurationOption.scss';

interface ConfigurationOptionsProps {
  tittle: string;
  text?: string;
  children?: ReactNode;
}
export const ConfigurationOption = (props: ConfigurationOptionsProps) => {
  const { tittle, text, children } = props;
  const [isOptionInfoVisible, setIsOptionInfoVisible] = useState<boolean>(false);

  const toggleOptionInfoVisibility = () => {
    setIsOptionInfoVisible(!isOptionInfoVisible);
  };

  return (
    <div className="configuration__options_group">
      <div className="configuration__option" onClick={toggleOptionInfoVisibility}>
        <div className="always_info">
          <h3 className="configuration__option_tittle">{tittle}</h3>
          <RightArrow
            className={classNames({
              configuration__option_svg: true,
              configuration__option_svg__active: isOptionInfoVisible,
            })}
          />
        </div>
        {isOptionInfoVisible && (
          <div
            className={classNames({
              option_info: true,
              option_info__active: isOptionInfoVisible,
            })}
          >
            {text && <p className="option_info__text">{text}</p>}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationOption;
