"use client";

import { OtpProps } from "@/types/form.types";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import OtpTimer from "./OtpTimer";

const OtpInput = ({ count = 6, onChange, value, error = "", intervalPeriod = 10 }: OtpProps) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRef.current[0]) inputRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value
    if (!/^[0-9]?$/.test(enteredValue)) return
    if (enteredValue.length <= 1) {
      const copy = [...value]
      copy[index] = enteredValue;
      onChange(copy)
    }
    if (index > 0 && enteredValue === "") {
      inputRef.current[index - 1]?.focus();
    } else if (inputRef.current[index + 1] && enteredValue !== "") {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index !== 0) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < count - 1) {
      inputRef.current[index + 1]?.focus();
    } else if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
      e.preventDefault();
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, count);
    onChange(data.split(""));
    inputRef.current[data.length - 1]?.focus();
  };


  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-2xl">Please enter the OTP sent to your email</span>
      <div className={`form-group otp gap-3 justify-center ${error ? "error" : ""}`}>
        {Array.from({ length: count }).map((_, index) => {
          return (
            <input
              id={`otpInput${index}`}
              key={index}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={value[index] || ""}
              onChange={(e) => handleChange(index, e)}
              ref={(el) => {
                inputRef.current[index] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
      <OtpTimer intervalPeriod={intervalPeriod} />
      {error && <span className="ms-3 text-red-500">{error}</span>}
    </div>
  );
};

export default OtpInput;
