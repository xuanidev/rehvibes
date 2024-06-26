import React, { useContext } from 'react';
import './card.scss';
import { Time, Level, AddToFavorites, Share } from './icons';
import classNames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { toastDefault, toastError } from '../constants';
import { ExercisesContext } from '../contexts/ExercisesContextProvider';

interface CardProps {
  size: 'sm' | 'md' | 'lg';
  isFav?: boolean;
  onFavClick?: () => void;
  img: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  duration: string;
  difficulty: string;
  exerciseId: number;
}

export const Card = (props: CardProps) => {
  const { size, img, text, isFav, onFavClick, onClick, difficulty, duration, exerciseId } = props;
  const { isLoadingAddToFav } = useContext(ExercisesContext);

  const handleShareClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    const urls = 'https://www.revibes.netlify.app/';
    navigator.clipboard
      .writeText(urls)
      .then(() => {
        toast.success('Copiado correctamente', { ...toastDefault, containerId: `modalCard${text}` });
      })
      .catch(() => {
        toast.error('Failed to copy', toastError);
      });
  };

  return (
    <>
      <button
        className={classNames({
          card: true,
          [`card--${size}`]: size,
        })}
        onClick={onClick}
      >
        <img src={img} className="card__img" />
        <div className="shadow_img" />
        <div
          className={classNames({
            card__content: true,
            [`card__content--${size}`]: size,
          })}
        >
          <h4
            className={classNames({
              card__text: true,
              [`card__text--${size}`]: size,
            })}
          >
            {text}
          </h4>
          <div
            className={classNames({
              card__info: true,
              [`card__info--${size}`]: size,
            })}
          >
            <div
              className={classNames({
                card__info__content: true,
                [`card__info__content--${size}`]: size,
              })}
            >
              <Time
                className={classNames({
                  card__icon_size: true,
                  [`card__icon_size--${size}`]: size,
                })}
              />
              {duration}
            </div>
            <div
              className={classNames({
                card__info__content: true,
                [`card__info__content--${size}`]: size,
              })}
            >
              <Level
                className={classNames({
                  card__icon_size: true,
                  [`card__icon_size--${size}`]: size,
                })}
              />
              {difficulty}
            </div>
          </div>
        </div>
        <div
          className={classNames({
            card__icons_top: true,
            [`card__icons_top--${size}`]: size,
          })}
        >
          {onFavClick && (
            <AddToFavorites
              className={classNames({
                card__icons_top_size: true,
                [`card__icons_top_size--${size}`]: size,
                [`card__icons_top_size--active`]: isFav,
                [`card__icons_top_size--loading`]: isLoadingAddToFav(exerciseId),
              })}
              onClick={event => {
                event.stopPropagation();
                onFavClick();
              }}
            />
          )}
          <Share
            className={classNames({
              card__icons_top_size: true,
              [`card__icons_top_size--${size}`]: size,
            })}
            onClick={handleShareClick}
          />
          <ToastContainer containerId={`modalCard${text}`} />
        </div>
      </button>
    </>
  );
};

export default Card;
