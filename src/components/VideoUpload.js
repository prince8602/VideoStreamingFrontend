import React, { useState, useContext } from "react";
import axios from "axios";
import "./VideoUpload.css";
import { AuthContext } from "./AuthContext";

function VideoUpload({ onUploadSuccess }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);

  if (!user || user.role !== "admin") {
    return <p>You do not have permission to upload videos.</p>;
  }

  const handleVideoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !description || !thumbnail || !file) {
    alert("Please provide all fields: title, description, thumbnail, and video file");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("thumbnail", thumbnail);
  formData.append("file", file);

  console.log("Uploading:", {
    title,
    description,
    thumbnail,
    file,
  });

  try {
    // ==== Important: Axios POST with options ====
    await axios.post("http://localhost:8081/videos/upload", formData, {
      // Authorization header (JWT token) use karo agar backend authentication laga ho:
      // headers: {
      //   "Authorization": "Bearer <JWT_TOKEN>", // <--- Uncomment & put your JWT if used
      // },
      // If you need cookies/session, uncomment this:
      // withCredentials: true
    });
    // ============================================
    alert("Upload successful!");
    setTitle("");
    setDescription("");
    setThumbnail(null);
    setFile(null);
    onUploadSuccess();
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed. Check console for details.");
  }
};

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="upload-input"
      />
      <textarea
        placeholder="Video Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="upload-textarea"
      />

      <label className="upload-label">Choose Thumbnail</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
        required
        className="upload-input"
      />
      <p className="file-name">Selected: {thumbnail?.name || "No file chosen"}</p>

      <label className="upload-label">Choose Video</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        required
        className="upload-input"
      />
      <p className="file-name">Selected: {file?.name || "No file chosen"}</p>

      <button type="submit" className="upload-btn">
        Upload Video
      </button>
    </form>
  );
}

export default VideoUpload;
