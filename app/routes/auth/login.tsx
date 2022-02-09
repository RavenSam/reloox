import { useActionData, json, redirect } from "remix"
import { login, createUserSession } from "~/lib/session.server"
import type { ActionFunction, MetaFunction } from "remix"
import { login_inputs } from "../../../config/inputs"

// export const action: ActionFunction = async ({ request }) => {
//    const form = await request.formData()

//    const fields = { username: form.get("username"), password: form.get("password") }

//    // Find User
//    const user = await login(fields)

//    if (!user) {
//       return json({ fieldErrors: { form: "Invalid Credentials" } })
//    }

//    // Create user session
//    return createUserSession(user.id, "/posts")
// }

export default function Login(): JSX.Element {
   const actionData = useActionData()

   return (
      <div className="mt-6">
         {actionData?.fieldErrors?.form && (
            <div className="alert alert-error">
               <div className="flex-1">
                  <label>{actionData.fieldErrors?.form}</label>
               </div>
            </div>
         )}

         <form method="POST" className="accent-primary space-y-4 mt-2">
            {login_inputs.map((input, i) => (
               <div key={i} className="form-control">
                  <label className="label">
                     <span className="label-text capitalize">{input.name}</span>
                  </label>
                  <input
                     type={input.type}
                     name={input.name}
                     id={input.name}
                     placeholder={input.placeholder}
                     className="input focus:input-accent input-bordered"
                     required
                  />
               </div>
            ))}

            <div className="form-control">
               <label className="cursor-pointer label !justify-start gap-2">
                  <input type="checkbox" className="checkbox checked:checkbox-accent " />
                  <span className="label-text">Remember me</span>
               </label>
            </div>

            <button type="submit" className="btn btn-accent px-8 rounded-full">
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
