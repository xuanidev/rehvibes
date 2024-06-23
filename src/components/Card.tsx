import './card.scss';
import { Time, Level, AddToFavorites, Share } from './icons';
import classNames from 'classnames';

interface CardProps {
  size: 'sm' | 'md' | 'lg';
  img: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  duration: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  style?: string;
}

export const Card = (props: CardProps) => {
  const { size, img, text, onClick, difficulty, duration, style } = props;

  return (
    <button
      className={classNames({
        card: true,
        [`card--${size}`]: size,
        [`${style}`]: style != undefined,
      })}
      onClick={onClick}
      disabled={true}
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
              fill="white"
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
              fill="white"
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
        <AddToFavorites
          fill="white"
          className={classNames({
            card__icons_top_size: true,
            [`card__icons_top_size--${size}`]: size,
          })}
        />
        <Share
          fill="white"
          className={classNames({
            card__icons_top_size: true,
            [`card__icons_top_size--${size}`]: size,
          })}
        />
      </div>
    </button>
  );
};

export default Card;
