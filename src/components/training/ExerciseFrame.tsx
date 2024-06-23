import { useState, useEffect, useRef } from 'react';
import { AddToFavorites, Play, Share } from '../icons';
import './exerciseFrame.scss';
import classNames from 'classnames';
import ExerciseVideo from '../../assets/videos/sentadillas.mp4';
import { getFromCookies } from '../../utils/helpers';
import { addExerciseToFavorites, removeExerciseFromFavorites } from '../../api/users';

interface ExerciseFrameProps {
  name: string;
  video?: string;
  currentExerciseId: number;
  favorites: number[];
  updateFavorites: (value: number) => void;
}

export const ExerciseFrame = (props: ExerciseFrameProps) => {
  const { name, video, currentExerciseId, favorites, updateFavorites } = props;

  const [play, setPlay] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    setPlay(!play);
  };

  const handleFavorites = async () => {
    try {
      if (isFavorite) {
        await removeExerciseFromFavorites(getFromCookies('uid'), currentExerciseId);
      } else {
        await addExerciseToFavorites(getFromCookies('uid'), currentExerciseId);
      }
      setIsFavorite(!isFavorite);
      updateFavorites(favorites.push(currentExerciseId));
    } catch (error) {
      console.log('No se ha podido añadir a favoritos');
    }
  };

  useEffect(() => {
    setIsFavorite(favorites.includes(currentExerciseId));
  }, [favorites, currentExerciseId]);

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

  return (
    <div className="exercise_frame">
      <h2 className="exercise_frame__name">{name}</h2>
      <div
        className={classNames({
          exercise_frame__video_container: true,
          ['exercise_frame__video_container__active']: play,
        })}
        onClick={() => {
          if (play) {
            handleClick();
          }
        }}
      >
        <video ref={videoRef} src={video ?? ExerciseVideo} className="exercise_frame__video" controls={false} loop />
        <Play
          className={classNames({
            exercise_frame__play_icon: true,
            ['exercise_frame__play_icon__active']: play,
          })}
          onClick={() => {
            if (!play) {
              handleClick();
            }
          }}
        />
        <Share
          className={classNames({
            exercise_frame__share_icon: true,
            ['exercise_frame__share_icon__active']: play,
          })}
        />
        <AddToFavorites
          key={currentExerciseId}
          className={classNames({
            exercise_frame__favorites_icon: true,
            ['exercise_frame__favorites_icon__active']: play,
            ['disabled_icon']: isFavorite,
          })}
          onClick={handleFavorites}
        />
      </div>
    </div>
  );
};

export default ExerciseFrame;
