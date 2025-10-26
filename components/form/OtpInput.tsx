"use client";

import { OtpProps } from "@/types/form.types";
import { ChangeEvent, KeyboardEvent, useEffect, useEffectEvent, useRef, useState } from "react";
import OtpTimer from "./OtpTimer";

const OtpInput = ({ count = 6, onChange, value, error = "", intervalPeriod = 10 }: OtpProps) => {
  const [otp, setOtp] = useState<string[]>([]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRef.current[0]) inputRef.current[0]?.focus();
  }, []);
  const syncOtp = useEffectEvent(() => {
    if (value && otp.join("") !== value) {
      setOtp(value.split(""));
    }
  });

  const updateFormData = useEffectEvent(() => {
    if (onChange) {
      onChange(otp.join(""));
    }
  });

  useEffect(() => {
    syncOtp();
  }, [value]);

  useEffect(() => {
    updateFormData();
  }, [otp]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!/^[0-9]?$/.test(value)) return
    if (value.length <= 1) {
      setOtp((prevState) => {
        const copy = [...prevState]
        copy[index] = value;
        return copy;
      });
    }
    if (index > 0 && value === "") {
      inputRef.current[index - 1]?.focus();
    } else if (inputRef.current[index + 1] && value !== "") {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index !== 0) {
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
    setOtp(data.split(""));
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
              value={otp[index] || ""}
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
