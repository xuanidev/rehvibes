import './nombreUsuario.scss';

interface NombreUsuarioProps {
  text: string;
}
export const NombreUsuario = ({ text }: NombreUsuarioProps) => {
  return (
    <div className="nombre_usuario">
      <p className="nombre_usuario__text">{text}</p>
      <input className="nombre_usuario__input" />
    </div>
  );
};
export default NombreUsuario;
