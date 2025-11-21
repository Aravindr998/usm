interface ProfileFormContent {
    key: string,
    label: string,
    type: "text" | "email" | "mobile" | "date",
    required?: boolean,
    disabled?: boolean
}

export const profileForm: ProfileFormContent[][] = [
    [
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "email", disabled: true, required: true },
    ],
    [
        { key: "mobile", label: "Mobile", type: "mobile" },
        { key: "dob", label: "Date of Birth", type: "date" },
    ]
]