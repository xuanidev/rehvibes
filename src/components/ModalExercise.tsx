import './modalExercise.scss';
import { Share, AddToFavorites, Play, Close } from './icons';
import Esterilla from '../assets/materials/esterilla.png';
import { ExerciseWarning } from './ExerciseWarning';
import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { addExerciseToFavorites, getFavorites, removeExerciseFromFavorites } from '../api/users';
import { getFromCookies } from '../utils/helpers';
import { UserContext } from '../contexts/UserContextProvider';
import { getExercisesById } from '../api/exercises';
import { Exercise } from '../models';
import MaterialsLandingContainer from './MaterialsLandingContainer';
import { useModal } from '../contexts/ModalContext';

interface ModalExerciseProps {
  id: number;
}

const defaultExercise: Exercise = {
  description: '',
  type: '',
  difficulty: 'Principiante',
  equipment: [],
  frequency: 0,
  id: 0,
  image: '',
  instructions: [],
  kcalBurned: '',
  mainAreas: [],
  maxRep: 0,
  minRep: 0,
  name: '',
  objective: '',
  precautions: '',
  secondAreas: [],
  series: 0,
  video: '',
  creationDate: undefined,
};

export const ModalExercise = ({ id }: ModalExerciseProps) => {
  const { currentExerciseId = 0 } = useContext(UserContext);
  const [exercise, setExercise] = useState<Exercise>(defaultExercise);
  const [play, setPlay] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setShowModalExercise, setShowModalLibrary } = useModal();

  const handleAddToFavorites = async () => {
    await getFavorites(getFromCookies('uid'));
  };

  const handleFavorites = async () => {
    try {
      if (isFavorite) {
        await removeExerciseFromFavorites(getFromCookies('uid'), currentExerciseId);
      } else {
        await addExerciseToFavorites(getFromCookies('uid'), currentExerciseId);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {}
  };

  const handleClick = () => {
    setPlay(!play);
  };
  const handleClose = () => {
    setShowModalExercise(false);
    setShowModalLibrary(false);
  };
  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [play]);
  const getExercise = async () => {
    const exercises = await getExercisesById([`${id}`]);
    if (exercises && exercises.length > 0) {
      setExercise(exercises[0]);
    }
  };
  useEffect(() => {
    getExercise();
  }, [currentExerciseId]);

  return (
    <div className="modal_exercise">
      <div className="modal_exercise__overlay">
        <Close className="close_icon" onClick={handleClose} />
        <div
          className={classNames({
            modal_exercise__video_container: true,
            ['modal_exercise__video_container__active']: play,
          })}
          onClick={() => {
            if (play) {
              handleClick();
            }
          }}
        >
          <video ref={videoRef} src={exercise.video} className="modal_exercise__video" controls={false} loop />
          <Play
            className={classNames({
              modal_exercise__play_icon: true,
              ['modal_exercise__play_icon__active']: play,
            })}
            onClick={() => {
              if (!play) {
                handleClick();
              }
            }}
          />
          <Share
            className={classNames({
              modal_exercise__share_icon: true,
              ['modal_exercise__share_icon__active']: play,
            })}
            onClick={handleAddToFavorites}
          />
          <AddToFavorites
            className={classNames({
              modal_exercise__favorites_icon: true,
              ['modal_exercise__favorites_icon__active']: play,
              ['disabled_icon']: isFavorite,
            })}
            onClick={handleFavorites}
          />
        </div>
        <div className="modal_exercise__right">
          <div className="modal_exercise__right__top">
            <h3>{exercise.name}</h3>
            <div className="modal_exercise__right__top_icons"></div>
          </div>
          <ul className="modal_exercise__right__content">
            <li className="modal_exercise__right__content_item">
              <span className="modal_exercise__label">Descripción del ejercicio</span>
              <h4 className="modal_exercise__text">{exercise.description}</h4>
            </li>
            <li className="modal_exercise__right__content_item">
              <span className="modal_exercise__label">Nivel de entrenamiento</span>
              <h4 className="modal_exercise__text">{exercise.difficulty}</h4>
            </li>
            <li className="modal_exercise__right__content_item">
              <span className="modal_exercise__label">Tipo de ejercicio</span>
              <h4 className="modal_exercise__text">{exercise.type}</h4>
            </li>
            <li className="modal_exercise__right__content_item">
              <span className="modal_exercise__label">Lo que vas a trabajar</span>
              <h4 className="modal_exercise__text">{exercise.mainAreas.join(', ')}</h4>
            </li>
          </ul>
          <MaterialsLandingContainer materials={exercise.equipment} srcImg={Esterilla} />
          <div className="modal_exercise__warning">
            <span className="modal_exercise__label">Precauciones</span>
            <ExerciseWarning text={exercise.precautions} style="warning_component" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExercise;
