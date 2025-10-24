"use client"

import { GlassCardProps } from "@/types/common.types"
import { ViewTransition } from 'react'
const GlassCard = ({children, ref, className = ""}: Readonly<GlassCardProps>) => {
  return (

    <ViewTransition name="glass-card" >
        <div ref={ref} className={"glass-card backdrop-blur-2xl w-full" + className}>
            {children}
        </div>
    </ViewTransition>
  )
}

export default GlassCard