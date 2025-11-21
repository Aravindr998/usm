"use client";
import { TextInputProps } from "@/types/form.types";
import { FocusEvent, useEffect, useState, ViewTransition } from "react";

const TextInput = ({ label = "", placeholder = "", type, id, error="", name="", onChange, ref, value, ...props }: TextInputProps) => {
  const [focus, setFocus] = useState(false);
  const handleFocusIn = () => {
    setFocus(true);
  };
  const handleFocusOut = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!e.target.value)
      setFocus(false);
  };

  useEffect(() => {
    if (value && !focus) {
      setFocus(true)
    }
  }, [value, focus])

  return (
    <div className="flex flex-col gap-1">
      <div className={`form-group ${error ? "error" : ""} @container/input`}>
        <label htmlFor={id || label} className={`${focus ? "focused" : ""} lg:text-2xl text-sm`}>{label}</label>
        <input {...props} id={id || label} value={value || ""} type={type} placeholder={placeholder} onFocus={handleFocusIn} onBlur={handleFocusOut} name={name} onChange={onChange ? onChange : undefined} ref={ref} />
      </div>
        {error && 
        <ViewTransition enter={"error-text"} exit={"error-hide"}>
          <a className="text-red-600 ms-2" href={`#${id || label}`}>{error}</a>
        </ViewTransition>
        }
    </div>
  );
};

export default TextInput;
