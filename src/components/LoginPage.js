import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    /* const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find(
        (user) =>
          (user.username === username || user.email === username) &&
          user.password === password
      );
      if (foundUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        navigate("/landing-page");
      } else {
        setLoginError("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } else {
      setLoginError("등록된 사용자가 없습니다. 먼저 회원가입해주세요.");
    } */
    const url = "http://localhost:9000/login";

    try {
      const response = await axios.get(url, { params: credentials });
      if (response.status === 200) {
        localStorage.setItem("loggedIn", true);
        navigate("/landing-page", {
          state: { nickname: response.data.nickname },
        });
      }
    } catch (error) {
      setLoginError(error.response.data.error);
    }
  };

  const loginFields = [
    {
      name: "username",
      label: "아이디",
      type: "text",
      placeholder: "아이디 또는 이메일을 입력하세요",
      required: true,
    },
    {
      name: "password",
      label: "비밀번호",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      required: true,
    },
  ];

  return (
    <AuthForm
      title="로그인"
      fields={loginFields}
      submitText="로그인"
      onSubmit={handleLogin}
      switchText="계정이 없으신가요? 회원가입"
      switchLink="/registration-page"
      generalError={loginError}
    />
  );
};

export default LoginPage;
