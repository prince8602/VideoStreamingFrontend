import { useParams } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import "./VideoDetail.css";

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null); // <-- video element ke liye ref

  useEffect(() => {
    axios.get(`http://localhost:8081/videos/${id}`)
      .then(res => setVideo(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Hover pe play start karne ka handler
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Hover se bahar jaane par pause karne ka handler
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // rewind video to start
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <>
      {/* Background div — dynamically set from video thumbnail */}
      <div 
        className="page-background" 
        style={{  backgroundImage: `url('${video.thumbnailUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(14px) brightness(0.97)',    // Netflix-style blur/dim
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1 }} 
      />
    <div className="hero-bg">
        <div className="main-content">
      <video ref={videoRef}  className="hero-video" src={video.url} controls poster={video.thumbnailUrl} muted                              // <-- muted bina autoplay blocked hoga 
        loop                              // <-- loop rakha for smooth hover preview
        onMouseEnter={handleMouseEnter}   // <-- hover start
        onMouseLeave={handleMouseLeave}/>
      <div className="details-bar">
        <h2>{video.title}</h2>
        <p>{video.year} • {video.genre} • {video.ageRating}</p>
        <p>{video.description}</p>
        
      </div>
      </div>
    </div>
    </>
  );
}

export default VideoDetail;