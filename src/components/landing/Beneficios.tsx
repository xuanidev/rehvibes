import './beneficios.scss';
import CardBeneficios from './CardBeneficios';

interface CardsProps {
  tittle: string;
  text: string;
}
interface CardsBeneficiosProps {
  cards: CardsProps[];
  id: string;
}

export const Beneficios = (props: CardsBeneficiosProps) => {
  const { cards, id } = props;
  return (
    <div className="section_Beneficios">
      <h2 className="tittle_h2" id={id}>
        Beneficios
      </h2>
      <p className="text_landing">
        Descubre todos los beneficios de la telerrehabilitación con Revibes. A tu ritmo, con tus horarios y con
        ejercicios y rutinas diseñados por profesionales de la salud y el deporte.
      </p>
      <div className="grid_items_beneficios">
        {cards.map((card: CardsProps, index: number) => {
          return <CardBeneficios tittle={card.tittle} text={card.text} style={`beneficios_item_${index}`} />;
        })}
      </div>
    </div>
  );
};
export default Beneficios;
