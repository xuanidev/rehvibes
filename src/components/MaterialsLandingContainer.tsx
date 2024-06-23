import './materialsLandingContainer.scss';
import ImgDefault from '../../public/assets/routinesLibrary/exercise7.png';

interface MaterialsLandingContainerProps {
  materials: string[];
  srcImg: string;
}
export const MaterialsLandingContainer = (props: MaterialsLandingContainerProps) => {
  const { materials, srcImg = ImgDefault } = props;
  return (
    <div className={`landing_content__materials ${materials.length === 0 ? 'display_none' : ''}`}>
      <h4 className="landing_content__section_tittle">
        Lo que vas a necesitar {materials.length > 0 ? `(${materials.length})` : ''}
      </h4>
      <ul className="landing_content__material_list">
        {materials.map((material: string) => {
          return (
            <li className="landing_content__material" key={material}>
              {material} <img src={srcImg} className="landing_content__material_img" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MaterialsLandingContainer;
