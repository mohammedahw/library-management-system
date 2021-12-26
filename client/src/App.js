import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { userContext } from "./Helper/User";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState({
    userEmail: "",
    loggedIn: false,
  });

  const refreshToken = async () => {
    try {
      const results = await axios.get(
        "http://localhost:5000/api/auth/refresh_token",
        { withCredentials: true }
      );
      console.log(results);
    } catch (err) {
      console.log("error", err);
    }
  };

  setInterval(() => {
    refreshToken();
  }, 119999);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setUser({ userEmail: email, loggedIn: true });
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          {user.loggedIn && <Navigate to="/" />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
