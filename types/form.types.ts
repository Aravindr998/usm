import { ChangeEvent, Ref } from "react"

export type InputType = "text" | "email" | "password"
export interface TextInputProps {
    label: string,
    placeholder?: string,
    type: InputType,
    id?: string,
    error?: string
    name: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    ref?: Ref<HTMLInputElement> | null
    value?: string
}

export interface AuthFormProps {
    children: React.ReactNode, 
    sideText: string
}

export interface FormItem {
    type: string;
    key: string;
    label: string;
    mandatory: boolean;
    avoidApi?: boolean;
    equalKey?: string
    equalLabel?: string
    length?: number
}

export interface OtpProps {
    count: number,
    onChange: (otp: string) => void,
    value: string,
    error: string
}