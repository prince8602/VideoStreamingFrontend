import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./VideoList.css";
import { AuthContext } from "./AuthContext";


function VideoList({ videos, handleDelete }) {
  const { user } = useContext(AuthContext);

  return (
    <section>
      <h2 className="category-title">Popular on Netflix</h2>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div className="video-row">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              {/* Thumbnail image clickable, goes to details page */}
              <Link to={`/video/${video.id}`}>
                <img
                  src={video.thumbnailUrl || ""}
                  className="thumbnail-img"
                  alt={video.title}
                  style={{ width: "320px", display: "block", cursor: "pointer", borderRadius: "16px" }}
                />
              </Link>
              <h3>{video.title}</h3>
              <p className="video-description">{video.description}</p>
              {user && user.role === "admin" && (
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(video.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default VideoList;