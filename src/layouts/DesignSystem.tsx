import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError } from "../constants";

export const DesignSystem = () => {
  return (
    <div>
      <section>
        <h2>1. Colores</h2>
        <div style={{ backgroundColor: "#007bff", color: "#fff" }}>
          Contenido con color de fondo primario
        </div>
      </section>

      <section>
        <h2>2. Tipografía</h2>
        <p
          style={{
            fontFamily: "Arial",
            fontSize: "16px",
            fontWeight: "normal",
          }}
        >
          Texto de ejemplo
        </p>
      </section>

      <section>
        <h2>3. Espaciado</h2>
        <div style={{ margin: "10px", padding: "20px" }}>
          Contenido con márgenes y relleno definidos
        </div>
      </section>

      <section>
        <h2>4. Iconos</h2>
        <i className="fas fa-home">Icono</i>
      </section>

      <section>
        <h2>5. Botones</h2>
        <button>Default</button>
        <button>Disabled</button>
        <button>Primary</button>
        <button>Warning</button>
        <button>Error</button>
      </section>

      <section>
        <h2>6. Formularios</h2>
        <input
          type="text"
          style={{ borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </section>

      <section>
        <h2>7. Componentes</h2>
        <div>
          <p>Título de la tarjeta</p>
          <p>Contenido de la tarjeta</p>
        </div>
      </section>

      <section>
        <h2>8. Grids</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>Elemento 1</div>
          <div>Elemento 2</div>
        </div>
      </section>

      <section>
        <h2>9. Reactividad y Animaciones</h2>
        <button
          onClick={() => toast.error("Error", toastError)}
          style={{ cursor: "pointer", transition: "background-color 0.3s" }}
        >
          Error
        </button>
      </section>

      <section>
        <h2>10. Documentación y Guía de Estilo</h2>
        <a href="/docs">Documentación</a>
      </section>
      <ToastContainer />
    </div>
  );
};

export default DesignSystem;
