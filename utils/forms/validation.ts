import { FormItem } from "@/types/form.types"

const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

const validateAlphaNumeric = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password)
}

const validateForm = (form: FormItem[], formData: Record<string, string | undefined>) => {
    const error: Record<string, string> = {}
    form.forEach(({type, key, label, mandatory, equalKey, equalLabel, length}) => {
        if (mandatory && !formData[key]) {
            error[key] = `${label} is required`
        } else if (formData[key]) {
            switch(type) {
                case "email":
                    console.log(validateEmail(formData[key]), formData[key])
                    if (!validateEmail(formData[key])) {
                        error[key] = "Invalid email"
                    }
                    break
                case "password":
                    if (!validateAlphaNumeric(formData[key]) && key !== "confirmPassword") {
                        error[key] = "Password must be atleast 6 characters long, it should contain atleast one capital letter, one number and one special character"
                    }
                    break
                case "otp":
                    if (length && formData[key].length < length) {
                        error[key] = `Invalid OTP`
                    }
            }
        }
        if (equalKey && formData[key] !== formData[equalKey]) {
            error[key] = `${equalLabel} and ${label} does not match`
        }
    })
    return error
}

export {
    validateEmail,
    validateForm
}