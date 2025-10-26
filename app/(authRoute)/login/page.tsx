"use client"

import TextInput from "@/components/form/TextInput";
import Link from "next/link";

import "../animation.css";
import AuthFormTemplate from "@/components/form/AuthFormTemplate";
import GlassCard from "@/components/Card/GlassCard";
import { FormEvent, startTransition, useState, ViewTransition } from "react";
import { validateEmail } from "@/utils/forms/validation";
import NeoPopButton from "@/components/button/NeoPopButton";

const LoginPage = () => {
  const [error, setError] = useState({
    email: "",
    password: ""
  })
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    let isError = false
    startTransition(() => {
      if (!email) {
        setError(prevState => {
          return {
            ...prevState,
            email: "Email is required"
          }
        })
        isError = true
      }
      if (!password) {
        setError(prevState => {
          return {
            ...prevState,
            password: "Password is required"
          }
        })
        isError = true
      }
      if (email && !validateEmail(email)) {
        setError(prevState => {
          return {
            ...prevState,
            email: "Invalid Email"
          }
        })
        isError = true
      }
    })
    if (isError) return
    const data = {
      email,
      password
    }
    console.log(data)
  }

  const handleChange = (value:string, key:string) => {
    resetError(key)
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }

  function resetError (key: string) {
    startTransition(() => {
      setError(prevState => {
        return {
          ...prevState,
          [key]: ""
        }
      })
    })
  }
  

  return (
    <AuthFormTemplate sideText="Login">
      <GlassCard>
        <form className="flex flex-col justify-around h-full gap-10" onSubmit={handleSubmit}>
          <div className="form-wrap w-full">
            <TextInput type="email" value={formData.email} label="Email" name="email" error={error?.email} onChange={(e) => handleChange(e.target.value, "email")} />
            <TextInput type="password" value={formData.password} label="Password" name="password" error={error?.password} onChange={(e) => handleChange(e.target.value, "password")} />
          </div>
          <ViewTransition name="auth-button">
            <div className="flex gap-7 flex-col items-center">
              <NeoPopButton>
                Login
              </NeoPopButton>
              <span>
                Don&apos;t have an account? <Link className="brand-link" href={"/signup"} >Sign up</Link>
              </span>
            </div>
          </ViewTransition>
        </form>
      </GlassCard>
    </AuthFormTemplate>
  );
};

export default LoginPage;
