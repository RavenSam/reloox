import { object, SchemaOf, string, ref } from "yup"

interface loginSchemaInterface {
   email: string
   password: string
}

interface signupSchemaInterface {
   username: string
   email: string
   password: string
   password2: string | undefined
}

export const loginSchema: SchemaOf<loginSchemaInterface> = object().shape({
   email: string().email().required(),
   password: string().min(8).max(32).required(),
})

export const signupSchema: SchemaOf<signupSchemaInterface> = object().shape({
   username: string().min(4).max(32).required(),
   email: string().email().required(),
   password: string().min(8).max(32).required(),
   password2: string().oneOf([ref("password"), null], "passwords must match"),
})
