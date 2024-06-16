import { useState, useEffect, useRef } from 'react';
import { Play } from '../icons';
import './exerciseFrame.scss';
import classNames from 'classnames';
import ExerciseVideo from '../../assets/videos/exercise.mp4';

interface ExerciseFrameProps {
  name: string;
  img?: string;
  video?: string;
}

export const ExerciseFrame = (props: ExerciseFrameProps) => {
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

  const { name, video } = props;
  return (
    <div className="exercise_frame">
      <h2 className="exercise_frame__name">{name}</h2>
      <div
        className={classNames({
          exercise_frame__video_container: true,
          ['exercise_frame__video_container__active']: play,
        })}
        onClick={handleClick}
      >
        <video ref={videoRef} src={video ?? ExerciseVideo} className="exercise_frame__video" controls={false} loop />
        <Play
          className={classNames({
            exercise_frame__play_icon: true,
            ['exercise_frame__play_icon__active']: play,
          })}
        />
      </div>
    </div>
  );
};
export default ExerciseFrame;
