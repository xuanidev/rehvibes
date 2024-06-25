import './claim.scss';
import { Points_Claim } from '../icons';

export const Claim = () => {
  return (
    <div className="claim__section">
      <h2 className="claim__tittle1">
        Con Revibes podrás alcanzar tu bienestar físico <br />y mental de la mano de...
      </h2>
      <div className="claim__div">
        <Points_Claim className="icon_claim" />
        <span className="claim__tittle2">una rehabilitación dinámica, efectiva y fácil de consumir.</span>
      </div>
      <button className="gotosignup">Comienza ahora</button>
    </div>
  );
};

export default Claim;
