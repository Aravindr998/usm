"use client"

import GlassCard from '@/components/Card/GlassCard'
import AuthFormTemplate from '@/components/form/AuthFormTemplate'
import TextInput from '@/components/form/TextInput'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <AuthFormTemplate sideText='Sign up'>
      <GlassCard>
        <form className="flex flex-col justify-around h-full gap-5">
          <div className="form-wrap w-full">
            <TextInput type="text" label="Name" />
            <TextInput type="email" label="Email" />
            <TextInput type="password" label="Password" />
            <TextInput type="password" label="Confirm Password" />
          </div>
          <div className="flex gap-7 flex-col items-center">
            <button type="button" className="neo-pop-btn w-full">
              Sign up
            </button>
            <span>
              Already have an account? <Link className='brand-link' href={"/login"} >Login</Link>
            </span>
          </div>
        </form>
      </GlassCard>
    </AuthFormTemplate>
  )
}

export default SignUpPage