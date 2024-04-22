import "../styles/style.scss";
import "./btnCta.scss";
import { CTAProps } from "../models";

function BtnCta(optionsData: CTAProps) {
  const { text, onClick, type } = optionsData;

  return (
    <>
      <button className="cta" onClick={onClick} type={type ?? "button"}>
        {text}
      </button>
    </>
  );
}

export default BtnCta;
