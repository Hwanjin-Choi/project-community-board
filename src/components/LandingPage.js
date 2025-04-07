import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
`;

const LandingPage = () => {
  const location = useLocation();
  const nickname = location.state?.nickname;

  return (
    <Container>
      <Title>로그인 성공!</Title>
      <p>{nickname}님, 환영합니다!</p>
    </Container>
  );
};

export default LandingPage;
