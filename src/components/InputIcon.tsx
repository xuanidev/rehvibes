//import "../styles/style.scss";
import "./input.scss";
import React, { useRef } from "react";
import { SVGProps } from "react";
import { InputProps } from "../models";

interface InputIconProps extends InputProps {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  iconWidth: number;
  iconHeight: number;
  className?: string;
  required?: boolean;
  regex?: string;
}

export const InputIcon = (props: InputIconProps) => {
  const {
    iconWidth,
    iconHeight,
    className,
    name,
    label,
    type,
    setValue,
    value,
    required,
    regex,
  } = props;

  const textInput = useRef<HTMLInputElement>(null!);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <>
      <div className="inputIcon__container" onClick={handleClick}>
        <props.icon
          width={iconWidth}
          height={iconHeight}
          className={className}
        />
        <input
          name={name}
          type={type}
          placeholder={label}
          value={value}
          {...(required && { required: true })}
          className="input__field"
          ref={textInput}
          onChange={(e) => setValue(e.target.value)}
          pattern={regex}
        />
      </div>
    </>
  );
};

export default InputIcon;
