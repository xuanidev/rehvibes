import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError } from "../constants";

export const DesignSystem = () => {
  return (
    <div>
      <section className="ds_section">
        <h2>1. Colores</h2>
        <div className="colors_section__content">
          <div className="content__color bg_primary">
            <h3>Primary</h3>
            <p>hsl(32, 100%, 61%)</p>
            <p>Text: black</p>
          </div>
          <div className="content__color bg_primary_light">
            <h3>Primary Light</h3>
            <p>hsl(32, 94%, 88%)</p>
            <p>Text: black</p>
          </div>
          <div className="content__color bg_fluorescent">
            <h3>Fluorescent</h3>
            <p>hsl(16, 100%, 45%)</p>
            <p>Text: white</p>
          </div>
          <div className="content__color bg_secondary">
            <h3>Secondary</h3>
            <p>hsl(16, 100%, 59%)</p>
            <p>Text: white</p>
          </div>
          <div className="content__color bg_secondary_dark">
            <h3>Secondary Dark</h3>
            <p>hsl(16, 70%, 49%)</p>
            <p>Text: white</p>
          </div>
        </div>
      </section>

      <section className="ds_section">
        <h2>2. Tipografía</h2>
        <ul className="typography_section">
          <li className="header_one">
            <p>H1: Header One</p>
            <ul className="sizes">
              <li>Size 'sm': 26px</li>
              <li>Size 'md': 26px</li>
              <li>Size 'lg': 26px</li>
              <li>Size 'xl': 40px</li>
            </ul>
          </li>
          <li className="header_two">
            <p>H2: Header Two</p>
            <ul className="sizes">
              <li>Size 'sm': 20px</li>
              <li>Size 'md': 26px</li>
              <li>Size 'lg': 26px</li>
              <li>Size 'xl': 30px</li>
            </ul>
          </li>
          <li className="header_three">
            <p>H3: Header Three</p>
            <ul className="sizes">
              <li>Size 'sm': 20px</li>
              <li>Size 'md': 20px</li>
              <li>Size 'lg': 20px</li>
              <li>Size 'xl': 26px</li>
            </ul>
          </li>
          <li className="bodies">
            <p className="bodies__bold">Body Bold</p>
            <p className="bodies__body">Body</p>
            <p className="bodies__light">Body Light</p>
            <ul className="sizes">
              <li>Size 'sm': 14px</li>
              <li>Size 'md': 16x</li>
              <li>Size 'lg': 16x</li>
              <li>Size 'xl': 16x</li>
            </ul>
          </li>
          <li className="button_meta">
            <p>Button & Meta</p>
            <ul className="sizes">
              <li>Size 'sm': 15px</li>
              <li>Size 'md': 16px</li>
              <li>Size 'lg': 18px</li>
              <li>Size 'xl': 20px</li>
            </ul>
          </li>
        </ul>
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
