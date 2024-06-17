import { Beneficios, Header, Slides, Funcionalidades , Video} from "../components/landing"
import { BeneficiosData } from "../components/landing/beneficiosData";

export const LandingProducto = () => {
    return(
        <>
        <Header/>
        <Beneficios cards={BeneficiosData}/>
        <Slides/>
        <Funcionalidades/>
        <Video/>

        </>
    )
}

export default LandingProducto;