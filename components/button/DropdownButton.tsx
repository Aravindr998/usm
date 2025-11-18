import { HTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react';

interface DropdownButtonProps extends HTMLAttributes<HTMLButtonElement> {
    type: "dark" | "light",
    buttonText: string
}

const DropdownButton = ({type, buttonText}: DropdownButtonProps) => {
  return (
    <button className={`flex items-center text-lg cursor-pointer ${type === "light" ? "text-black" : "text-white"}`}>
        <span>{buttonText}</span>
        <ChevronDown />
    </button>
  )
}

export default DropdownButton