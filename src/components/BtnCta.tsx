import "../styles/style.scss";
import "./btnCta.scss";

export interface CTAProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | undefined;
  link?: boolean;
  href?: string;
}

export const BtnCta = (optionsData: CTAProps) => {
  const { text, onClick, type, link, href } = optionsData;

  return (
    <>
      {link ? (
        <a className="cta" href={href}>
          {text}
        </a>
      ) : (
        <button className="cta" onClick={onClick} type={type ?? "button"}>
          {text}
        </button>
      )}
    </>
  );
};

export default BtnCta;
