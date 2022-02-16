import { settings_inputs } from "../../../config/inputs"
import { useState } from "react"
import { ActionFunction, json, Link, LoaderFunction, useActionData, useLoaderData } from "remix"
import UserAvatar from "~/components/shared/UserAvatar"
import { db } from "~/lib/db.server"
import { getUser } from "~/lib/session.server"

export const action: ActionFunction = async ({ request }) => {
   const user = await getUser(request)
   const form = await request.formData()

   const avatar = form.get("avatar")
   const bio = form.get("bio")
   const name = form.get("name")
   const username = form.get("username")

   const fields = { avatar, bio, name }

   if (typeof username !== "string") {
      console.log(username)
      return json({ fieldErrors: { form: "Invalid Credentials" }, fields })
   }

   if (user?.username !== username) {
      const usernameTaken = await db.user.findFirst({ where: { username } })

      if (usernameTaken) {
         return json({ fieldErrors: { form: "Username alredy taken" }, fields })
      } else {
         await db.user.update({ where: { id: user?.id }, data: { username } })
      }
   }

   return await db.user.update({ where: { id: user?.id }, data: { profile: { update: fields } } })
}

export const loader: LoaderFunction = async ({ request }) => {
   const user = await getUser(request)

   return { user }
}

export default function Settings(): JSX.Element {
   const { user } = useLoaderData()
   const actionData = useActionData()

   const [uploadedImage, setUploadedImage] = useState<any>(user.profile.avatar)

   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>Settings</h1>
         </div>

         <form method="post" className="max-w-4xl mx-auto py-12">
            {actionData?.fieldErrors?.form && (
               <div className="alert alert-error my-4">
                  <div className="flex-1">
                     <label>{actionData.fieldErrors?.form}</label>
                  </div>
               </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="">
                  <UserAvatar uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
                  <input
                     type="hidden"
                     name="avatar"
                     defaultValue={typeof uploadedImage === "string" ? uploadedImage : uploadedImage?.url}
                     className="hidden"
                     required
                  />
               </div>

               <div className="space-y-6">
                  {settings_inputs.map((input, i) => (
                     <div key={i} className="form-control">
                        <label className="label">
                           <span className="label-text capitalize">{input.label}</span>
                        </label>
                        <input
                           minLength={4}
                           defaultValue={user?.profile[input.name] || user?.[input.name]}
                           type={input.type}
                           name={input.name}
                           className="input focus:input-primary input-bordered focus:invalid:input-secondary"
                        />
                     </div>
                  ))}

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Bio</span>
                     </label>
                     <textarea
                        defaultValue={user.profile.bio}
                        name="bio"
                        className="textarea h-full textarea-bordered focus:textarea-primary  w-full"
                     ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                     <button type="submit" className="btn btn-primary">
                        Save Changes
                     </button>

                     <Link to="/dashboard" className="btn btn-ghost rounded-full">
                        Cancel
                     </Link>
                  </div>
               </div>
            </div>
         </form>
      </>
   )
}
