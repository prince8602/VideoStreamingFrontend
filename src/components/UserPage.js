import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../NetflixHome.css';

function UserPage() {
  const [videos, setVideos] = useState([]);
  const [playFeatured, setPlayFeatured] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8081/videos");
        setVideos(response.data);
      } catch (err) {
        alert("Failed to fetch videos: " + err.message);
      }
    };
    fetchVideos();
  }, []);

  const featured = videos[0];
  const rest = videos.slice(1);

  const encodeUrl = url => encodeURI(url);

  return (
    <div className="netflix-home-bg">
      {/* NAVBAR */}
      <header className="netflix-navbar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png"
          alt="Netflix Logo"
          className="netflix-logo"
        />
        <nav className="netflix-tabs">
            {/* TV Shows tab */}
  <button type="button" className="tab-btn">TV Shows</button>

  {/* Movies tab */}
  <button type="button" className="tab-btn">Movies</button>

  {/* Recently Added tab */}
  <button type="button" className="tab-btn">Recently Added</button>

  {/* My List tab */}
  <button type="button" className="tab-btn">My List</button>
        </nav>
      </header>

      {/* FEATURED VIDEO */}
      {featured && (
        <section className="netflix-featured-banner">
          <div className="netflix-featured-bg"
          onMouseEnter={() => setPlayFeatured(true)}
          onMouseLeave={() => setPlayFeatured(false)}
          >
            {playFeatured ? (
              <video
                src={encodeUrl(featured.url)}
                autoPlay
                muted
                loop
                controls
                className="netflix-featured-video"
              />
            ) : (
              <img
                src={featured.thumbnailUrl || "https://via.placeholder.com/900x400"}
                className="netflix-featured-img"
                alt={featured.title}
              />
            )}
          </div>
          <div className="netflix-featured-info">
            <h1>{featured.title}</h1>
            <p>{featured.description || "No description available."}</p>
            <div>
              <button
                className="netflix-action play-btn"
                onClick={() => setPlayFeatured(true)}
              >
                &#9654; Play
              </button>
              <button className="netflix-action mylist-btn">+ My List</button>
            </div>
          </div>
        </section>
      )}

      {/* VIDEO LIST */}
      <section className="netflix-row">
        <h2>Popular on Netflix</h2>
        <div className="netflix-row-cards">
          {rest.map(video => (
            <div className="netflix-card" key={video.id}>

               <Link to={`/video/${video.id}`}>
              <img
                src={video.thumbnailUrl || "https://via.placeholder.com/200x111"}
                className="netflix-card-video"
                alt={video.title}
                  style={{ cursor: 'pointer' }} // pointer cursor for clarity
              />
                </Link>
              <div className="netflix-card-title">{video.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserPage;
