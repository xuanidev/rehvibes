import './video.scss';
import VideoRevibes from '../../assets/landing/video_revibes.mp4';
import { useEffect, useRef, useState } from 'react';
import PlayOrange from '../icons/PlayOrange';
import classNames from 'classnames';

export const Video = () => {
  const [play, setPlay] = useState<boolean>(false);
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
  return (
    <section
      className={classNames({
        video_landing_container: true,
        ['video_landing_container__active']: play,
      })}
      onClick={() => {
        if (play) {
          handleClick();
        }
      }}
    >
      <video ref={videoRef} src={VideoRevibes} className="video_container_video" controls={false} loop />
      <div
        className={classNames({
          text_container_video: true,
          ['text_container_video__active']: play,
        })}
      >
        Más que salud, más que ejercicio, más que tu cuerpo.
      </div>
      <PlayOrange
        className={classNames({
          icon_container_video: true,
          ['icon_container_video__active']: play,
        })}
        onClick={() => {
          if (!play) {
            handleClick();
          }
        }}
      />
    </section>
  );
};

export default Video;
