import './cardBeneficios.scss';

interface CardBeneficiosProps {
  tittle: string;
  text: string;
  style?: string;
}

export const CardBeneficios = (props: CardBeneficiosProps) => {
  const { tittle, text, style } = props;
  return (
    <div className={`beneficios ${style}`}>
      <div className="beneficios__container">
        <h3 className="beneficios__tittleh3">{tittle}</h3>
        <p className="beneficios__text">{text}</p>
      </div>
    </div>
  );
};
export default CardBeneficios;
