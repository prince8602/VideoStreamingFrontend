import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (username, password) => {
    let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user", password: "user123", role: "user" }
    ];
    const foundUser = usersDB.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const signup = (username, password, role = "user") => {
    let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user", password: "user123", role: "user" }
    ];
    if (usersDB.find(u => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }
    const newUser = { username, password, role };
    usersDB.push(newUser);
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
