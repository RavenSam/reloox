import { useActionData, json, redirect } from "remix"
import { login, createUserSession } from "~/lib/session.server"
import type { ActionFunction, MetaFunction } from "remix"
import { login_inputs } from "../../../config/inputs"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../../config/yupSchema"
import { isEmpty } from "lodash"

export const action: ActionFunction = async ({ request }) => {
   const form = await request.formData()

   const fields = { email: form.get("email"), password: form.get("password") }

   // Login User
   const user = await login(fields)

   if (!user) {
      return json({ fieldErrors: { form: "Invalid Credentials" }, fields })
   }

   // Create user session
   return createUserSession(user.id, "/")
}

export default function Login(): JSX.Element {
   const actionData = useActionData()
   const { register, formState } = useForm({ mode: "onBlur", resolver: yupResolver(loginSchema) })
   const { errors, isSubmitting } = formState

   return (
      <div className="mt-6">
         {actionData?.fieldErrors?.form && (
            <div className="alert alert-error">
               <div className="flex-1">
                  <label>{actionData.fieldErrors?.form}</label>
               </div>
            </div>
         )}

         <form method="POST" className=" space-y-4 mt-2">
            {login_inputs.map((input, i) => (
               <div key={i} className="form-control">
                  <label className="label">
                     <span className="label-text capitalize">{input.label}</span>
                  </label>
                  <input
                     minLength={4}
                     defaultValue={actionData?.fields[input.name]}
                     type={input.type}
                     placeholder={input.placeholder}
                     {...register(input.name)}
                     className="input focus:input-primary input-bordered focus:invalid:input-secondary"
                     required
                  />
                  {errors[input.name] && (
                     <label className="label">
                        <span className="label-text-alt text-pink-500">{errors[input.name]?.message}</span>
                     </label>
                  )}
               </div>
            ))}

            <div className="form-control">
               <label className="cursor-pointer label !justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary " />
                  <span className="label-text">Remember me</span>
               </label>
            </div>

            <button
               type="submit"
               className={`btn btn-primary ${isSubmitting && "loading"}`}
               disabled={isSubmitting || !isEmpty(errors)}
            >
               Sign Up
            </button>
         </form>
      </div>
   )
}

export const meta: MetaFunction = () => {
   const title = "Login - ReBlox"
   const description = "A react blog build with remix and tailwindCSS"
   const keywords = "react, tailwind, javascript, remix"

   return { title, description, keywords }
}
