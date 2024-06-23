import './profileRoutines.scss';
import { useState } from 'react';
import Card from '../Card';
import classNames from 'classnames';
import ImgDefault from '../../assets/ImgDefault.png';
import TarjetaRutina from '../../assets/tarjeta_rutina.png';
import TarjetaRutina2 from '../../assets/tarjeta_rutina2.png';
import TarjetaRutina3 from '../../assets/tarjeta_rutina3.png';
import TarjetaRutina4 from '../../assets/tarjeta_rutina4.png';

interface Exercise {
  id: number;
  name: string;
  image: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
}

const routines: Exercise[] = [
  { id: 1, name: 'Pecho Superior', image: TarjetaRutina, difficulty: 'Principiante' },
  { id: 2, name: 'Pecho Superior', image: TarjetaRutina2, difficulty: 'Intermedio' },
  { id: 3, name: 'Pecho Superior', image: TarjetaRutina3, difficulty: 'Intermedio' },
  { id: 4, name: 'Pecho Superior', image: TarjetaRutina4, difficulty: 'Principiante' },
];

const routina = { id: 1, name: 'Pecho Superior', image: TarjetaRutina, difficulty: 'Principiante' };
export const ProfileRoutines = () => {
  const [defaultSelected, setDefaultSelected] = useState<boolean>(true);

  return (
    <div className="profile_routines">
      <h3 className="profile_routines__tittle">Mis rutinas</h3>
      <div className="profile_routines__content">
        <div className="profile_routines__content_tab_selector">
          <button
            className={classNames({
              profile_routines__content_tab: true,
              profile_routines__content_tab_active: defaultSelected,
            })}
            onClick={() => setDefaultSelected(true)}
          >
            Favoritos
          </button>
          <div className="vl"></div>
          <button
            className={classNames({
              profile_routines__content_tab: true,
              profile_routines__content_tab_active: !defaultSelected,
            })}
            onClick={() => setDefaultSelected(false)}
          >
            Realizadas
          </button>
        </div>
        {defaultSelected ? (
          <div className="profile_routines__routines">
            {routines.map(routine => (
              <Card
                key={routine.id}
                img={routine.image ?? ImgDefault}
                difficulty={routine.difficulty}
                duration={'40min' + '.'}
                onClick={() => console.log(`Clicked on routine ${routine.id}`)}
                size="sm"
                text={routine.name}
                style="routines_margin_auto"
              />
            ))}
          </div>
        ) : (
          <div className="profile_routines__routines">
            <Card
              key={routina.id}
              img={routina.image ?? ImgDefault}
              difficulty="Intermedio"
              duration={'40min' + '.'}
              onClick={() => console.log(`Clicked on routine ${routina.id}`)}
              size="sm"
              text={routina.name}
              style="routines_margin_auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRoutines;
