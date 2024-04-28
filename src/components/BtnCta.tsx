import "../styles/style.scss";
import "./btnCta.scss";

export interface CTAProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | undefined;
}

export const BtnCta = (optionsData: CTAProps) => {
  const { text, onClick, type } = optionsData;

  return (
    <>
      <button className="cta" onClick={onClick} type={type ?? "button"}>
        {text}
      </button>
    </>
  );
};

export default BtnCta;
