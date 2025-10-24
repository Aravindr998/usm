import { FormItem } from "@/types/form.types"

const registrationForm: FormItem[][] = [
    [
        {type: "text", key: "name", label: "Name", mandatory: true},
        {type: "email", key: "email", label: "Email", mandatory: true},
        {type: "password", key: "password", label: "Password", mandatory: true},
        {type: "password", key: "confirmPassword", label: "Confirm Password", mandatory: true, avoidApi: true, equalKey: "password", equalLabel: "Password"},
    ], 
    [
        {type: "otp", key: "otp", label: "OTP", mandatory: true, length: 6},
    ]
]

export default registrationForm