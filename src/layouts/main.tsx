import { Card } from "../components";
import PechoSuperior from "../assets/routinesLibrary/pecho superior.png";
export const Main = () => {
  return (
    <div className="login">
      <Card
        img={PechoSuperior}
        difficulty="Intermedia"
        duration={"40min" + "."}
        onClick={() => {
          console.log("click");
        }}
        size="sm"
        text="Pecho Superior"
      ></Card>
    </div>
  );
};
