"use client";
import { TextInputProps } from "@/types/form.types";
import { useState } from "react";

const TextInput = ({ label = "", placeholder = "", type, id }: TextInputProps) => {
  const [focus, setFocus] = useState(false);
  const handleFocusIn = () => {
    setFocus(true);
  };
  const handleFocusOut = () => {
    setFocus(false);
  };
  return (
    <div className="form-group">
      <label htmlFor={id || label} className={`${focus ? "focused" : ""}`}>{label}</label>
      <input id={id || label} type={type} placeholder={placeholder} onFocus={handleFocusIn} onBlur={handleFocusOut} />
    </div>
  );
};

export default TextInput;
