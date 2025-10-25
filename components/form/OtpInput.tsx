"use client";

import { OtpProps } from "@/types/form.types";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

const OtpInput = ({ count = 6, onChange, value, error = "", intervalPeriod = 10 }: OtpProps) => {
  const [otp, setOtp] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [postLoadingMessage, setPostLoadingMessage] = useState("")
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (inputRef.current[0]) inputRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0 && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [timer])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (postLoadingMessage) {
      timeout = setTimeout(() => {
        setPostLoadingMessage("")
      }, 1000)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [postLoadingMessage])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const setOtpTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prevState => {
        if (prevState === undefined) {
          return intervalPeriod
        } else if (prevState > 0) {
          return --prevState
        }
        return 0
      })
    }, 1000)
  }, [intervalPeriod])

  useEffect(() => {
    if (intervalPeriod !== undefined) {
      setOtpTimer()
    }
    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current)
    }
  }, [intervalPeriod, setOtpTimer])

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

  let time
  if (timer !== undefined) {
    const minute = Math.floor(timer / 60)
    const seconds = Math.floor(timer % 60)
    time = `${minute < 10 ? "0" : ""}${minute}: ${seconds < 10 ? "0" : ""}${seconds}`
  }

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

  const handleResendOtp = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (intervalPeriod === undefined || (timer && timer > 0)) return
    setLoading(true)
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("")
      }, 2000)
    })
    setLoading(false)
    setPostLoadingMessage("OTP Send Successfully")
    setTimer(intervalPeriod)
    setOtpTimer()
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-2xl">Please enter the OTP sent to your email</span>
      <div className={`form-group otp gap-3 justify-center ${error ? "error" : ""}`}>
        {Array.from({ length: count }).map((_, index) => {
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
      {
        loading ?
          <a>Sending...</a> :
          postLoadingMessage ?
            <a>{postLoadingMessage}</a> :
            <a className="cursor-pointer" onClick={handleResendOtp}>Resend OTP {!!timer && time && <span>({time})</span>}</a>
      }
      {error && <span className="ms-3 text-red-500">{error}</span>}
    </div>
  );
};

export default OtpInput;
