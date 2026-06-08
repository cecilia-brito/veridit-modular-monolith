import React from "react";
import "./inputField.css";

export interface InputFieldProps {
  type: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} />;
};

export default InputField;
