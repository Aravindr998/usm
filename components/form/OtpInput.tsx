"use client";

import { OtpProps } from "@/types/form.types";
import { ChangeEvent, useEffect, useEffectEvent, useRef, useState } from "react";

const OtpInput = ({ count = 6, onChange, value, error = "" }: OtpProps) => {
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
    if (e.target.value.length <= 1) {
      setOtp((prevState) => {
        prevState[index] = e.target.value;
        return [...prevState];
      });
    }
    if (index > 0 && e.target.value === "") {
      inputRef.current[index - 1]?.focus();
    } else if (inputRef.current[index + 1] && e.target.value !== "") {
      inputRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`form-group otp gap-3 justify-center ${error ? "error" : ""}`}>
        {Array.from({ length: count }).map((item, index) => {
          return (
            <input
              key={index}
              min="0"
              type="number"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e)}
              ref={(el) => {
                inputRef.current.push(el);
              }}
            />
          );
        })}
      </div>
      {error && <span className="ms-3 text-red-500">{error}</span>}
    </div>
  );
};

export default OtpInput;
