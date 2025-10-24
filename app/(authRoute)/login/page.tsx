"use client"

import TextInput from "@/components/form/TextInput";
import Link from "next/link";

import "../animation.css";
import AuthFormTemplate from "@/components/form/AuthFormTemplate";
import GlassCard from "@/components/Card/GlassCard";
import { FormEvent, useState } from "react";
import { validateEmail } from "@/utils/forms/validation";

const LoginPage = () => {
  const [error, setError] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    if (!email) {
      setError(prevState => {
        return {
          ...prevState,
          email: "Email is required"
        }
      })
      return
    }
    if (!password) {
      setError(prevState => {
        return {
          ...prevState,
          password: "Password is required"
        }
      })
      return
    }
    if (email && !validateEmail(email)) {
      setError(prevState => {
        return {
          ...prevState,
          email: "Invalid Email"
        }
      })
      return
    }
    const data = {
      email,
      password
    }
    console.log(data)
  }

  function resetError (key: string) {
    setError(prevState => {
      return {
        ...prevState,
        [key]: ""
      }
    })
  }
  

  return (
    <AuthFormTemplate sideText="Login">
      <GlassCard>
        <form className="flex flex-col justify-around h-full gap-10" onSubmit={handleSubmit}>
          <div className="form-wrap w-full">
            <TextInput type="email" label="Email" name="email" error={error?.email} onChange={() => resetError("email")} />
            <TextInput type="password" label="Password" name="password" error={error?.password} onChange={() => resetError("password")} />
          </div>
          <div className="flex gap-7 flex-col items-center">
            <button className="neo-pop-btn w-full">
              Login
            </button>
            <span>
              Don&apos;t have an account? <Link className="brand-link" href={"/signup"} >Sign up</Link>
            </span>
          </div>
        </form>
      </GlassCard>
    </AuthFormTemplate>
  );
};

export default LoginPage;
