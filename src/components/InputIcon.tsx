//import "../styles/style.scss";
import "./input.scss";
import React, { useRef } from "react";
import { SVGProps } from "react";
import { InputProps } from "../models";

export interface InputIconProps extends InputProps {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  iconWidth: number;
  iconHeight: number;
}

const InputText = (props: InputIconProps) => {
  const { iconWidth, iconHeight, name, label, type, setValue, value } = props;

  const textInput = useRef<HTMLInputElement>(null!);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <>
      <div className="inputText__container" onClick={handleClick}>
        <props.icon width={iconWidth} height={iconHeight} />
        <input
          name={name}
          type={type}
          required
          placeholder={label}
          value={value}
          className="input__field"
          ref={textInput}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default InputText;
