import { logInputsType } from "types"

export const signup_inputs: logInputsType[] = [
   { name: "username", label: "username", type: "text", placeholder: "johndoe" },
   { name: "email", label: "your email", type: "email", placeholder: "johndoe@exemple.com" },
   { name: "password", label: "your password", type: "password", placeholder: "••••••••••" },
   { name: "password2", label: "confirm password", type: "password", placeholder: "••••••••••" },
]

export const login_inputs: logInputsType[] = [
   { name: "email", label: "your email", type: "email", placeholder: "johndoe@exemple.com" },
   { name: "password", label: "your password", type: "password", placeholder: "••••••••••" },
]
