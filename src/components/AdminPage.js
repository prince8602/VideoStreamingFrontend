import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AdminPage.css";
import { AuthContext } from "./AuthContext";

function AdminPage() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8081/videos");
      setVideos(res.data);
    } catch (err) {
      alert("Failed to load videos");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !description || !thumbnail || !videoFile) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("file", videoFile);

    try {
      await axios.post("http://localhost:8081/videos/upload", formData, {
        headers: {
    // "Authorization": "Bearer <JWT Token if any>"
    "Content-Type": "multipart/form-data"
  },
  withCredentials: true // agar credentials use ho rahe hain
});
      alert("Video uploaded!");
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setVideoFile(null);
      fetchVideos();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console for details.");

    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/videos/${id}`);
      fetchVideos();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (!user || user.role !== "admin") {
    return <p>You do not have admin access.</p>;
  }

  return (
    <div className="admin-container">
      <h2>Upload New Video</h2>
      <form className="admin-form" onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="upload-label">Choose Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />
        <label className="upload-label">Choose Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <h2>Popular on Netflix</h2>
      <div className="admin-video-list">
        {videos.map((video) => (
          <div key={video.id} className="admin-video-card">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="admin-thumbnail"
            />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <video controls width="100%">
              <source src={video.url} type="video/mp4" />
            </video>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;