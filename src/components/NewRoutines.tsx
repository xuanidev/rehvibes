import './newRoutines.scss';
import Btn from './Btn';
import Card from './Card';
import PechoSuperior from '../assets/routinesLibrary/pecho superior.png';
import { Plus } from './icons';

export const NewRoutines = () => {
  return (
    <div className="new_routines">
      <h3>Nuevas rutinas que te pueden interesar</h3>
      <div className="routines">
        <Card
          img={PechoSuperior}
          difficulty="Intermedia"
          duration={'40min' + '.'}
          onClick={() => {
            console.log('click');
          }}
          size="sm"
          text="Pecho Superior"
        ></Card>
        <Card
          img={PechoSuperior}
          difficulty="Intermedia"
          duration={'40min' + '.'}
          onClick={() => {
            console.log('click');
          }}
          size="sm"
          text="Pecho Superior"
        ></Card>
      </div>
      <Btn btnClass="borderGradient" text="Ver más" />
    </div>
  );
};

export default NewRoutines;
