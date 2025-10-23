export interface TextInputProps {
    label: string,
    placeholder?: string,
    type: "text" | "email" | "password",
    id?: string
}

export interface AuthFormProps {
    children: React.ReactNode, 
    sideText: string
}