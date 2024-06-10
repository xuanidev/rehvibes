import './cardBeneficios.scss';

interface CardBeneficiosProps {
    tittle: string;
    text: string;
}

export const CardBeneficios = (props: CardBeneficiosProps) =>{
    const {tittle, text} = props;
    return (<div>
        <div>{tittle}</div>
        <div>{text}</div>
        </div>
    );
}
export default CardBeneficios;