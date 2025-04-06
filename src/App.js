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
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/login-page" />} />{" "}
        {/* 기본 경로 설정 */}
      </Routes>
    </Router>
  );
};

export default App;
