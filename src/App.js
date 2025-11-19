import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoDetail from "./VideoDetail";




// Route protection for admin
function ProtectAdmin({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/user" />;
  return children;
}

// Route protection for user
function ProtectUser({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "user") return <Navigate to="/admin" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <ProtectAdmin>
                <AdminPage />
              </ProtectAdmin>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectUser>
                <UserPage />
              </ProtectUser>
            }
          />
         <Route path="/videos" element={<VideoList />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
