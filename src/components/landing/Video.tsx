import './video.scss';

export const Video = () => {
    return (
        <section className="video-container">
        <video controls>
            <source src= "../assets/landing/video_revibes.mp4" type="video/mp4"/>
            Tu navegador no soporta la etiqueta de video.
        </video>
    </section>
    );
};

export default Video;