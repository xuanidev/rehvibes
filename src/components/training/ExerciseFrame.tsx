import { useState, useEffect, useRef } from 'react';
import { AddToFavorites, Play, Share } from '../icons';
import './exerciseFrame.scss';
import classNames from 'classnames';
import ExerciseVideo from '../../assets/videos/sentadillas.mp4';
import { getFromCookies } from '../../utils/helpers';
import { updateUserFavorites } from '../../api/users';

interface ExerciseFrameProps {
  name: string;
  video?: string;
  currentExerciseId: number;
}

export const ExerciseFrame = (props: ExerciseFrameProps) => {
  const { name, video, currentExerciseId } = props;

  const [play, setPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    setPlay(!play);
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

  console.log(video);
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
          className={classNames({
            exercise_frame__favorites_icon: true,
            ['exercise_frame__favorites_icon__active']: play,
          })}
          onClick={async () => await updateUserFavorites(getFromCookies('uid'), currentExerciseId)}
        />
      </div>
    </div>
  );
};
export default ExerciseFrame;
