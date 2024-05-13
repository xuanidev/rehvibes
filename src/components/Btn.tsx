import '../styles/style.scss';
import './btnIcon.scss';
import React from 'react';
import { SVGProps } from 'react';

export interface BtnProps {
  text?: string;
  btnClass?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  link?: boolean;
  href?: string;
  leftIcon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  rightIcon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  iconWidth?: number;
  iconHeight?: number;
  iconClass?: string;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | undefined;
}

export const Btn = (props: BtnProps) => {
  const { text, btnClass, onClick, link, href, iconWidth, iconHeight, iconClass, isDisabled, type } = props;

  return (
    <>
      {link ? (
        <a className={`btnIcon ${btnClass}`} href={href}>
          {props.leftIcon && <props.leftIcon width={iconWidth} height={iconHeight} className={iconClass} />}
          {text}
          {props.rightIcon && <props.rightIcon width={iconWidth} height={iconHeight} className={`icon ${iconClass}`} />}
        </a>
      ) : (
        <button
          className={`btnIcon ${btnClass}`}
          onClick={onClick}
          type={type ?? 'button'}
          disabled={isDisabled ?? false}
        >
          {props.leftIcon && <props.leftIcon width={iconWidth} height={iconHeight} className={iconClass} />}
          {text}
          {props.rightIcon && <props.rightIcon width={iconWidth} height={iconHeight} className={iconClass} />}
        </button>
      )}
    </>
  );
};

export default Btn;
