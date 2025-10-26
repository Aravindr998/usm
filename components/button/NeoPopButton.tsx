"use client"

import { ButtonHTMLAttributes } from "react"

import "./neopop.css"

interface NeoPopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    className?: string
}

const NeoPopButton = ({children, className, ...props}: NeoPopButtonProps) => {
  return (
    <button className={`neo-pop-btn w-full ${className ? className : ""}`} {...props}>{children}</button>
  )
}

export default NeoPopButton