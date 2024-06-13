import './materialsContainer.scss';
import ImgDefault from '../../assets/routinesLibrary/exercise7.png';

interface MaterialsContainerProps {
  materials: string[];
  srcImg: string;
}
export const MaterialsContainer = (props: MaterialsContainerProps) => {
  const { materials, srcImg = ImgDefault } = props;
  return (
    <div className={`routine_content__materials ${materials.length === 0 ? 'display_none' : ''}`}>
      <h4 className="routine_content__section_tittle">
        Lo que vas a necesitar {materials.length > 0 ? `(${materials.length})` : ''}
      </h4>
      <ul className="routine_content__material_list">
        {materials.map((material: string) => {
          return (
            <li className="routine_content__material">
              {material} <img src={srcImg} className="routine_content__material_img" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MaterialsContainer;
