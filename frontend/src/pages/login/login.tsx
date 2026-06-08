import React from "react";
import "./login.css";
import PrimaryButton from "../../components/primaryButton/primaryButton";
import InputArea from "../../components/inputArea/inputArea";

//interface LoginProps {}

const Login: React.FC = () => {
  return (
    <>
      <InputArea label="E-mail" type="email" />
      <InputArea label="Senha" type="password" />
      <PrimaryButton text="Entrar" />
    </>
  );
};

export default Login;
