import { LoaderWhite } from './icons';
import './loaderContainer.scss';

interface LoaderContainerProps {
  text: string;
  isLoaded: boolean;
}

export const LoaderContainer = (props: LoaderContainerProps) => {
  const { text, isLoaded = false } = props;
  return (
    isLoaded && (
      <div className="loader_container">
        <div className="gradient">
          <p>{text}</p>
          <LoaderWhite height={100} width={100} className="loader" fill="#ffff" />
        </div>
      </div>
    )
  );
};

export default LoaderContainer;
