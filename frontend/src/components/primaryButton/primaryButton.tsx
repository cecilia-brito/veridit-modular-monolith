import React from "react";
import "./primaryButton.css";

interface PrimaryButtonProps {
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text }) => {
  return <button>{text}</button>;
};

export default PrimaryButton;
