"use client"

import { AuthFormProps } from '@/types/form.types'
import { ViewTransition } from 'react'

const AuthFormTemplate = ({children, sideText}: Readonly<AuthFormProps>) => {
  return (
    <div>
      <div className="h-screen flex items-center justify-around p-10">
        <ViewTransition name="form-name">
            <div className='@container/main grow inline-block'>
                <span className="@3xl/main:text-[15rem] @2xl/main:text-[10rem] @xl/main:text-[8rem] text-[8rem] text-(--secondary-color) hidden lg:inline-block w-fit whitespace-normal">{sideText}</span>
            </div>
        </ViewTransition>
        <div className="relative w-full max-w-[90%] lg:max-w-20 login flex items-center justify-center">
          <div className="shape bg-white absolute w-72 h-72 -top-30 -left-26 rounded-full filter blur-sm opacity-10" />
          <div className="shape bg-white absolute w-72 h-72 top-8 -right-36 rounded-full filter blur-sm opacity-10 animation-delay-2000" />
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthFormTemplate