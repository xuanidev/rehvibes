import StripedBar from './StripedBar';
import { Level, Lightning, Sesion, Share, Time } from './icons';
import './infotrabajado.scss';
import Cuello from '../assets/cuello.png';
import Trapecios from '../assets/trapecios.png';
interface cualidades {
  text: string;
  percentage: number;
}

interface infoTrabajadoProps {
  energy: string;
  time: string;
  level: string;
  sesions: string;
  zones?: string[];
  cualidades: cualidades[];
}

export const InfoTrabajado = (props: infoTrabajadoProps) => {
  const { energy, time, level, sesions, cualidades } = props;

  const TEXT = 'Esto es lo que has trabado al largo de la semana';

  return (
    <div className="info_trabajado">
      <div className="info_top">
        <div className="info__title">
          <h2 className="info__text">{TEXT}</h2>
          <Share fill="#ff662e" color="#ff662e" width={20} height={20} className="share_icon" />
        </div>
        <ul className="info_table">
          <li className="info__line">
            <Lightning fill="#ff662e" width={20} height={20} />
            Energia: <span>{energy}</span>
          </li>
          <li className="info__line">
            <Time fill="#ff662e" width={20} height={20} />
            Tiempo ejercicio: <span>{time}</span>
          </li>
          <li className="info__line">
            <Level fill="#ff662e" width={20} height={20} />
            Nivel de intensidad: <span>{level}</span>
          </li>
          <li className="info__line">
            <Sesion fill="#ff662e" width={20} height={20} />
            Nº Sesiones: <span>{sesions}</span>
          </li>
        </ul>
        <div className="info_cualidades">
          {cualidades.map((percentage: cualidades, index: number) => (
            <div className="cualidad" key={index}>
              <StripedBar percentage={percentage.percentage} />
              <span>{percentage.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="info_images__tablet">
        <img src={Cuello} alt="Mapa muscular de un cuerpo humano señalando el cuello" className="body_img"></img>
        <img src={Trapecios} alt="Mapa muscular de un cuerpo humano señalando el trapecio" className="body_img"></img>
      </div>
      <div className="info_bottom">
        <div className="info_cualidades__desktop">
          {cualidades.map((percentage: cualidades, index: number) => (
            <div className="cualidad" key={index}>
              <StripedBar percentage={percentage.percentage} />
              <span>{percentage.text}</span>
            </div>
          ))}
        </div>
        <div className="info_images">
          <img
            src={Cuello}
            alt="Mapa muscular de un cuerpo humano señalando el cuello"
            className="body_img__desktop"
          ></img>
          <img
            src={Trapecios}
            alt="Mapa muscular de un cuerpo humano señalando el trapecio"
            className="body_img__desktop"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default InfoTrabajado;
