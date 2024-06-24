import { Beneficios, Header, Slides, Funcionalidades , Video, Claim, Caracteristicas, Formulario,  Footer_landing } from "../components/landing"
import { BeneficiosData } from "../components/landing/beneficiosData";

export const LandingProducto = () => {
    return(
        <>
        <Header/>
        <Beneficios cards={BeneficiosData}/>
        <Slides/>
        <Funcionalidades/>
        <Video/>
        <Claim/>
        <Caracteristicas/>
        <Formulario/>
        <Footer_landing/>

        </>
    )
}

export default LandingProducto;