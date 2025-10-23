"use client"

import TextInput from "@/components/form/TextInput";
import Link from "next/link";

import "../animation.css";
import AuthFormTemplate from "@/components/form/AuthFormTemplate";
import GlassCard from "@/components/Card/GlassCard";

const LoginPage = () => {

  return (
    <AuthFormTemplate sideText="Login">
      <GlassCard>
        <form className="flex flex-col justify-around h-full gap-5">
          <div className="form-wrap w-full">
            <TextInput type="email" label="Email" />
            <TextInput type="password" label="Password" />
          </div>
          <div className="flex gap-7 flex-col items-center">
            <button type="button" className="neo-pop-btn w-full">
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
