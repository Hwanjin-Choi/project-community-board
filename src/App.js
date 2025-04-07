import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import LandingPage from "./components/LandingPage";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("loggedIn") ? localStorage.getItem("loggedIn") : false
  );
  console.log(isLoggedIn);
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />

        <Route path="/" element={<Navigate to="/login-page" />} />
        <Route
          path="/landing-page"
          element={isLoggedIn ? <LandingPage /> : <Navigate to="/login-page" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
