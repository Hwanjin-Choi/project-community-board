import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  background-color: #e0ffe0;
  color: #2e7d32;
  padding: 16px 35px 16px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
  z-index: 1000;

  &.hiding {
    animation: ${fadeOut} 0.3s ease-in forwards;
  }

  button {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #2e7d32;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;

const Notification = ({ message, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setIsHiding(false);
      const timer = setTimeout(() => {
        setIsHiding(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 300); // fadeOut 애니메이션 시간과 동일하게 설정
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, duration]);

  if (!isVisible && !isHiding) {
    return null;
  }

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  return (
    <NotificationContainer className={isHiding ? "hiding" : ""}>
      {message}
      <button onClick={handleClose}>×</button>
    </NotificationContainer>
  );
};

export default Notification;
