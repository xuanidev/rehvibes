import { Btn, Card, InputIcon } from '../components';
import { Plus, UserIcon } from '../components/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '../constants';
import PechoSuperior from '../../public/assets/routinesLibrary/pecho superior.png';

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

      <section className="ds_section">
        <h2>3. Espaciado</h2>
        <div className="spaces_section">
          <div className="spaces_section__8px">8px</div>
          <div className="spaces_section__16px">16px</div>
          <div className="spaces_section__24px">24px</div>
          <div className="spaces_section__32px">32px</div>
          <div className="spaces_section__40px">40px</div>
        </div>
      </section>

      <section className="ds_section">
        <h2>4. Botones</h2>
        <Btn text="Primary" btnClass="primary" />
        <Btn text="Disabled" btnClass="disabled" />
        <Btn btnClass="borderGradient" leftIcon={Plus} iconHeight={24} iconWidth={24} iconClass="color-brand icon" />
        <Btn text="Gradient" btnClass="borderGradient" />
        <Btn
          text="Left Icon"
          btnClass="borderGradient"
          leftIcon={Plus}
          iconHeight={24}
          iconWidth={24}
          iconClass="color-brand icon"
        />
        <Btn
          text="Right Icon"
          btnClass="borderGradient"
          rightIcon={Plus}
          iconHeight={24}
          iconWidth={24}
          iconClass="color-brand icon"
        />
        <Btn
          text="Both Icons"
          btnClass="borderGradient"
          leftIcon={Plus}
          rightIcon={Plus}
          iconHeight={24}
          iconWidth={24}
          iconClass="color-brand icon"
        />
      </section>

      <section className="ds_section">
        <h2>5. Componentes</h2>
        <div className="components_section">
          <InputIcon
            icon={UserIcon}
            className={'color-brand'}
            iconWidth={19}
            iconHeight={19}
            label="Input"
            name="email"
            value={''}
            setValue={() => {}}
            type="email"
            required={true}
          />
          <Card
            img={PechoSuperior}
            difficulty="Intermedio"
            duration={'40min' + '.'}
            onClick={() => {
              console.log('click');
            }}
            size="sm"
            text="Pecho Superior"
            exerciseId={1}
          ></Card>
        </div>
      </section>

      <section>
        <h2>6. Grids</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          <div>Elemento 1</div>
          <div>Elemento 2</div>
        </div>
      </section>

      <section>
        <h2>7. Reactividad y Animaciones</h2>
        <button
          onClick={() => toast.error('Error', toastError)}
          style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          Error
        </button>
      </section>
      <ToastContainer />
    </div>
  );
};

export default DesignSystem;
