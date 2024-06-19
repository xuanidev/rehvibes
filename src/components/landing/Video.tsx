import './video.scss';
import VideoRevibes from '../../assets/landing/video_revibes.mp4';

export const Video = () => {
    return (
        <section className="video-container">
        <video autoPlay loop>
            <source src={VideoRevibes} type="video/mp4"/>
            Tu navegador no soporta la etiqueta de video.
        </video>
    </section>
    );
};

export default Video;