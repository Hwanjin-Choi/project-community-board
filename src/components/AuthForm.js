import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #777;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 0.9em;
`;

const AuthForm = ({
  title,
  fields,
  submitText,
  onSubmit,
  switchText,
  switchLink,
  generalError,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // 입력 변경 시 에러 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setErrors); // 에러 상태를 onSubmit 함수로 전달
  };

  return (
    <FormContainer>
      <Title>{title}</Title>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputGroup key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
            {errors[field.name] && (
              <ErrorMessage>{errors[field.name]}</ErrorMessage>
            )}
          </InputGroup>
        ))}
        <Button type="submit">{submitText}</Button>
      </form>
      {generalError && (
        <ErrorMessage style={{ marginTop: "15px", textAlign: "center" }}>
          {generalError}
        </ErrorMessage>
      )}
      <LinkText>
        {switchText} <a href={switchLink}>{switchText.split(" ")[2]}</a>
      </LinkText>
    </FormContainer>
  );
};

export default AuthForm;
