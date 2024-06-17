import './cardBeneficios.scss';

interface CardBeneficiosProps {
    tittle: string;
    text: string;
}

export const CardBeneficios = (props: CardBeneficiosProps) =>{
    const {tittle, text} = props;
    return (      
        <div className="beneficios">
          <div className="beneficios__container">
            <h3 className="beneficios__tittle">{tittle}</h3>
            <p className="beneficios__text">{text}</p>
          </div>
        </div>
        );
}
export default CardBeneficios;