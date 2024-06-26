import {
  Header,
  Beneficios,
  Funcionalidades,
  Slides,
  Video,
  Claim,
  Caracteristicas,
  Formulario,
  Footer_landing,
} from '../components/landing';
import { BeneficiosData } from '../components/landing/beneficiosData';

export const LandingProducto = () => {
  return (
    <>
      <Header />
      <Beneficios cards={BeneficiosData} id="beneficios" />
      <Slides />
      <Funcionalidades id="funcionalidades" />
      <Video />
      <Claim />
      <Caracteristicas id="entrenamientos" />
      <Formulario />
      <Footer_landing />
    </>
  );
};

export default LandingProducto;
