import React from "react";
import type { InputFieldProps } from "../inputField/inputField";
import "./InputArea.css";
import InputField from "../inputField/inputField";

interface InputAreaProps extends InputFieldProps {
  label: string;
}

const InputArea: React.FC<InputAreaProps> = ({ label, type, placeholder }) => {
  return (
    <>
      <div>
        <label>{label}</label>
        <InputField type={type} placeholder={placeholder} />
      </div>
    </>
  );
};

export default InputArea;
