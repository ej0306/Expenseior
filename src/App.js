import React, { useContext } from "react";
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ThemeContextProvider from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <ThemeContextProvider>
      <div className="App">
        {loading && 
          <div className="loader-parent">
            <Spinner />
          </div>
        }
        <BrowserRouter>
        <div className="toggle-button-container">
          <ThemeToggle/>
        </div>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {" "}
                  <Home />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <div className="login">
                    <Login />
                  </div>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
