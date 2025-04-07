import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import axios from "axios";
import Notification from "./Notification";
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const handleSignupSubmit = (formData, setFieldErrors) => {
    const { username, email, password, passwordConfirm, nickname } = formData;
    let isValid = true;
    const errors = {};

    // 아이디 유효성 검사 (간단한 예시)
    if (!username) {
      errors.username = "아이디를 입력해주세요.";
      isValid = false;
    }

    // 이메일 유효성 검사 (간단한 예시)
    if (!email) {
      errors.email = "이메일을 입력해주세요.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "유효하지 않은 이메일 형식입니다.";
      isValid = false;
    }

    // 비밀번호 유효성 검사
    if (!password) {
      errors.password = "비밀번호를 입력해주세요.";
      isValid = false;
    } else if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      errors.password =
        "비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.";
      isValid = false;
    }

    // 비밀번호 확인 유효성 검사
    if (!passwordConfirm) {
      errors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
      isValid = false;
    } else if (password !== passwordConfirm) {
      errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (!nickname) {
      errors.nickname = "닉네임을 입력해주세요.";
      isValid = false;
    }

    setFieldErrors(errors);
    const registerAction = async () => {
      const url = "http://localhost:9000/register";

      try {
        const body = { username, email, password, nickname };

        const result = await axios.post(url, body);
        if (result.status === 201) {
          setNotificationMessage(
            "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."
          );
          setTimeout(() => navigate("/login-page"), 2000); // 성공 메시지 잠시 보여주고 로그인 페이지로 이동
        }
      } catch (error) {
        setSignupError(error.response.data.error);
      }
    };
    if (isValid) {
      setIsSigningUp(true);
      setSignupError(""); // 이전 에러 메시지 초기화
      registerAction();
      setIsSigningUp(false);
      /* setTimeout(() => navigate("/login-page"), 2000); // 성공 메시지 잠시 보여주고 로그인 페이지로 이동 */
    }
  };

  const registrationFields = [
    {
      name: "username",
      label: "아이디",
      type: "text",
      placeholder: "사용할 아이디를 입력하세요",
      required: true,
    },
    {
      name: "email",
      label: "이메일",
      type: "email",
      placeholder: "이메일 주소를 입력하세요",
      required: true,
    },
    {
      name: "password",
      label: "비밀번호",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      required: true,
    },
    {
      name: "passwordConfirm",
      label: "비밀번호 확인",
      type: "password",
      placeholder: "비밀번호를 다시 입력하세요",
      required: true,
    },
    {
      name: "nickname",
      label: "닉네임",
      type: "text",
      placeholder: "표시할 닉네임을 입력하세요",
      required: true,
    },
  ];

  return (
    <React.Fragment>
      <Notification message={notificationMessage} />
      <AuthForm
        title="회원가입"
        fields={registrationFields}
        submitText={isSigningUp ? "회원가입 중..." : "회원가입"}
        onSubmit={handleSignupSubmit}
        switchText="이미 계정이 있으신가요? 로그인"
        switchLink="/login-page"
        generalError={signupError || signupSuccess}
      />
    </React.Fragment>
  );
};

export default RegistrationPage;
