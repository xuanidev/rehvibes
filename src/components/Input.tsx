import "../styles/style.scss";
import "./input.scss";
import { useRef } from "react";
import { InputProps } from "../models";

export const Input = (props: InputProps) => {
  const { name, label, type, setValue, value } = props;

  const textInput = useRef<HTMLInputElement>(null!);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <>
      <div className="inputText__container" onClick={handleClick}>
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

export default Input;
