import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { UserPage } from "./Pages/UserPage";
import { Home } from "./Pages/Home";
import { userContext } from "./Helper/User";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState({
    userEmail: "",
    loggedIn: false,
  });

  const refreshToken = () => {
    try {
      axios.get("http://localhost:5000/api/auth/refresh_token", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (user.loggedIn) {
    setInterval(() => {
      refreshToken();
    }, 119988);
  }

  useEffect(() => {
    const email = Cookies.get("email");
    if (email)
      setUser(() => {
        return { userEmail: email, loggedIn: true };
      });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={user.loggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              exact
              path="/register"
              element={user.loggedIn ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/users/:id"
              element={
                typeof Cookies.get("email") === "string" ? (
                  <UserPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
