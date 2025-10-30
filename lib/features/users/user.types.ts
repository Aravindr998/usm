export interface UserLoginData {
    email: string,
    password: string
}

export interface UserRegistrationData {
    email: string,
    password: string,
    name: string
}

export interface OtpVerifyData {
    email: string,
    otp: string
}
export interface OtpResendData {
    email: string,
}

export interface UserInitialState {
    userDetails: unknown,
    isVerified: boolean,
    isLoading: boolean,
    error: unknown
}