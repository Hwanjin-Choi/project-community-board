import React from "react";
import styled from "styled-components";

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
  const [currentUser, setCurrentUser] = React.useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  console.log(currentUser.email);
  return (
    <Container>
      <Title>로그인 성공!</Title>
      <p>{currentUser.nickname}님, 환영합니다!</p>
    </Container>
  );
};

export default LandingPage;
