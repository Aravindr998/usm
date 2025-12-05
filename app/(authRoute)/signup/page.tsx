"use client";

import NeoPopButton from "@/components/button/NeoPopButton";
import GlassCard from "@/components/Card/GlassCard";
import AuthFormTemplate from "@/components/form/AuthFormTemplate";
import OtpInput from "@/components/form/OtpInput";
import TextInput from "@/components/form/TextInput";
import { InputType } from "@/types/form.types";
import registrationForm from "@/utils/forms/registrationForm";
import { validateForm } from "@/utils/forms/validation";
import Link from "next/link";
import { FormEvent, startTransition, useCallback, useEffect, useEffectEvent, useState, ViewTransition } from "react";
import { useRegisterUserMutation, useResendOtpMutation, useVerifyOtpMutation } from "@/lib/features/auth/authApi";
import { UserRegistrationData } from "@/lib/features/auth/auth.types";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [error, setError] = useState<Record<string, string>>({});

  const [registerUser, {data: registrationData, isLoading }] = useRegisterUserMutation()
  const [verifyOtp, {isLoading: otpLoading}] = useVerifyOtpMutation()
  const [resendOtp, {data: resendData, isLoading: resendOtpLoading, error: resendError}] = useResendOtpMutation()

  const router = useRouter()

  const resetFormData = useEffectEvent(() => setFormData({}))

  useEffect(() => {
    resetFormData()
  }, [step])

  const checkOtp = useCallback(async() => {
    const data = {
        email: registrationData?.user?.email,
        otp: formData?.otp
      }
      const res = await verifyOtp(data)
      if (res?.data?.success) {
        router.push("/")
      }
  }, [formData?.otp, registrationData?.user?.email, router, verifyOtp])

  useEffect(() => {
    if (step === 1 && formData?.otp?.length === 6) {
      checkOtp()
    }
  }, [step, formData?.otp, checkOtp])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return
    setError({})
    const formErrors = validateForm(registrationForm[step], formData);
    startTransition(() => {
      setError(formErrors);
    });
    if (Object.keys(formErrors).length !== 0) {
      return;
    }
    if (step === 0) {
      const res = await registerUser((formData as unknown) as UserRegistrationData)
      if (res?.data?.success) {
        startTransition(() => {
            setStep(1);
        });
      }
    } else {
      checkOtp()
    }
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

  const handleChange = (value: string | string[], key: string, type: string) => {
    resetError(key)
    switch(type) {
      case "otp":
        if (typeof value === "string") return
        setFormData(prevState => {
          return {
            ...prevState,
            [key]: value.join("")
          }
        })
      default:
        if (typeof value !== "string") return
        setFormData(prevState => {
          return {
            ...prevState,
            [key]: value
          }
        })
    }
    
  }

  const handleResendOtp = async () => {
    try {
      await resendOtp({email: registrationData?.user?.email as string})
    } catch (error) {
      console.log(error)
    }
  }

  const loading = isLoading || otpLoading

  return (
    <AuthFormTemplate sideText="Sign up">
      <GlassCard>
        <form className="flex flex-col justify-around h-full gap-10" onSubmit={handleSubmit}>
          <div className="form-wrap w-full flex flex-col gap-5">
            {registrationForm[step].map(({ type, key, label }) => {
              switch (type) {
                case "otp":
                  return <OtpInput count={6} key={key} value={formData[key] ? formData[key]?.split("") : []} onChange={(value) => handleChange(value, key, type)} error={error[key]} resend={handleResendOtp} resendLoading={resendOtpLoading} resendError={resendError} resendData={resendData}/>;
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
                      onChange={(e) => handleChange(e.target.value, key, type)}
                    />
                  );
              }
            })}
          </div>
          <ViewTransition name="auth-button">
            <div className="flex gap-7 flex-col items-center">
              <NeoPopButton loading={loading}>{step === 0 ? "Sign up" : "Submit"}</NeoPopButton>
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
