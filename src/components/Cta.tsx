import "../styles/style.scss";
import "./cta.scss";
import { CTAProps } from "../models";

function Cta(optionsData: CTAProps) {
  const { text, action } = optionsData;

  return (
    <>
      <button className="cta" onClick={action}>
        {text}
      </button>
    </>
  );
}

export default Cta;
