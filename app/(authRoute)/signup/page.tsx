"use client";

import GlassCard from "@/components/Card/GlassCard";
import AuthFormTemplate from "@/components/form/AuthFormTemplate";
import OtpInput from "@/components/form/OtpInput";
import TextInput from "@/components/form/TextInput";
import { InputType } from "@/types/form.types";
import registrationForm from "@/utils/forms/registrationForm";
import { validateForm } from "@/utils/forms/validation";
import Link from "next/link";
import { FormEvent, startTransition, useEffect, useEffectEvent, useState, ViewTransition } from "react";

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [error, setError] = useState<Record<string, string>>({});

  const resetFormData = useEffectEvent(() => setFormData({}))

  useEffect(() => {
    resetFormData()
  }, [step])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({})
    const formErrors = validateForm(registrationForm[step], formData);
    startTransition(() => {
      setError(formErrors);
    });
    if (Object.keys(formErrors).length !== 0) {
      return;
    }
    console.log(formData);
    startTransition(() => {
      setStep((prevState) => (prevState === 0 ? 1 : 0));
    });
  };

  function resetError(key: string) {
    if (error[key]) {
      startTransition(() => {
        setError((prevState) => {
          return {
            ...prevState,
            [key]: "",
          };
        });
      });
    }
  }

  const handleChange = (value: string, key: string) => {
    resetError(key)
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }

  return (
    <AuthFormTemplate sideText="Sign up">
      <GlassCard>
        <form className="flex flex-col justify-around h-full gap-10" onSubmit={handleSubmit}>
          <div className="form-wrap w-full flex flex-col gap-5">
            {registrationForm[step].map(({ type, key, label }) => {
              switch (type) {
                case "otp":
                  return <OtpInput count={6} key={key} value={formData[key]} onChange={(value) => handleChange(value, key)} error={error[key]}/>;
                default:
                  return (
                    <TextInput
                      type={type as InputType}
                      key={key}
                      label={label}
                      name={key}
                      id={key}
                      value={formData[key]}
                      error={error[key]}
                      onChange={(e) => handleChange(e.target.value, key)}
                    />
                  );
              }
            })}
          </div>
          <ViewTransition name="auth-button">
            <div className="flex gap-7 flex-col items-center">
              <button className="neo-pop-btn w-full">{step === 0 ? "Sign up" : "Submit"}</button>
              {step === 0 && (
                <span className="text-center">
                  Already have an account?{" "}
                  <Link className="brand-link" href={"/login"}>
                    Login
                  </Link>
                </span>
              )}
            </div>
          </ViewTransition>
        </form>
      </GlassCard>
    </AuthFormTemplate>
  );
};

export default SignUpPage;
