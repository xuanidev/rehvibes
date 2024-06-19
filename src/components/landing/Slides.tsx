
import './slides.scss';


export const Slides = () => {
return (
    <div className="slider">
        <ul>
            <li className="container_slide">
                <div className="slide1">
                    <div className="text">
                        <h3>Tu bienestar <br />es tu día a día</h3>
                        <p>En Revibes te ayudamos a rehabilitarte encontrando tu mejor salud física y a la vez, asentando ese hábito para que puedas aumentar tu calidad de vida</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="slide2">
                    <div className="text">
                        <h3>Nuestra IA te ayudará a encontrar <br />lo que necesitas</h3>
                        <p>Con la información que nos proporciones en el formulario de bienvenida, nuestra Inteligencia Artificial te guiará y te ayudará encontrar las rutinas y ejercicios que más te puedan aportar</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="slide3">
                    <div className="text">
                        <h3>Para cualquier persona <br />y en cualquier entorno</h3>
                        <p>No hay excusas. En Revibes queremos poner todas las facilidades posibles para que puedas llevar a cabo esos objetivos que te has marcado, y para ello, lo hemos hecho lo más fácil para ti.</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="slide4">
                    <div className="text">
                        <h3>MONITORIZA TU PROGRESIÓN <br />Y CONTRASTA TU CAMBIO</h3>
                        <p>Nuestra aplicación guardará todos tus datos de entrenamientos diarios y te mostrará con gráficas precisas el tiempo de entrenamiento, qué zonas has entrenado y las características de los ejercicios</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>  




);
};

export default Slides;