"use client"

import { ButtonHTMLAttributes } from "react"

import "./neopop.css"

interface NeoPopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    className?: string,
    loading?: boolean,
    disabled?: boolean
}

const NeoPopButton = ({children, className, loading, disabled=false, ...props}: NeoPopButtonProps) => {
  return (
    <button className={`neo-pop-btn w-full justify-center items-center ${className ? className : ""} ${loading ? "loading flex": "inline-block"}`} {...props} disabled={loading || disabled}>{
      loading ? <div className="loader"></div> : children
    }</button>
  )
}

export default NeoPopButton