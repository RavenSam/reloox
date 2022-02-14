import { useEffect, useState } from "react"
import slugify from "../../../../utilts/slugify"
import checkFields from "../../../../utilts/checkFields"
import ImageUpload from "~/components/shared/ImageUpload"
import { ActionFunction, json, Link, redirect, useActionData } from "remix"
import ContentInput from "~/components/ContentInput"
import { getUser } from "~/lib/session.server"
import { db } from "~/lib/db.server"

export const action: ActionFunction = async ({ request }) => {
   const form = await request.formData()

   const fields = {
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description"),
      thumbnail: form.get("thumbnail"),
      content: form.get("content"),
   }

   checkFields(fields)

   // check if slug is already taken
   const slugToString = typeof fields.slug === "string" ? fields.slug : fields.slug?.toString()
   const slugIsTaken = await db.post.findFirst({ where: { slug: slugToString } })

   if (slugIsTaken) {
      return json({ fieldErrors: { slug: "Slug already taken" }, fields })
   }

   //   Get the author
   const user = await getUser(request)

   if (!user) {
      return redirect("/auth/login")
   }

   //  create the post buy updating the user
   // @ts-ignore: Unreachable code error
   await db.user.update({ where: { id: user.id }, data: { posts: { create: fields } } })

   return redirect("/dashboard/articles")
}

export default function NewArticle(): JSX.Element {
   const actionData = useActionData()
   const [title, setTitle] = useState<string>(actionData?.fields?.title || "")
   const [slug, setSlug] = useState<string>(actionData?.fields?.slug || "")
   const [uploadedImage, setUploadedImage] = useState<any>(actionData?.fields?.thumbnail)
   const [content, setContent] = useState(actionData?.fields?.content || "")

   useEffect(() => setSlug(slugify(title)), [title])

   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>New Article</h1>
         </div>

         <form method="post" className="max-w-3xl mx-auto py-12 space-y-8">
            {actionData?.fieldErrors?.form && (
               <div className="alert alert-error">
                  <div className="flex-1">
                     <label>{actionData.fieldErrors?.form}</label>
                  </div>
               </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="form-control flex-1">
                  <label className="label">
                     <span className="label-text">Article Title</span>
                  </label>
                  <input
                     type="text"
                     defaultValue={actionData?.fields?.title}
                     name="title"
                     className="input focus:input-primary input-bordered w-full"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     minLength={5}
                     maxLength={60}
                     required
                  />
               </div>
               <div className="form-control flex-1">
                  <label className="label">
                     <span className="label-text">Slug</span>
                  </label>
                  <input
                     type="text"
                     defaultValue={actionData?.fields?.slug}
                     name="slug"
                     className="input focus:input-primary input-bordered w-full"
                     value={slug}
                     onChange={(e) => setSlug(e.target.value)}
                     required
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="form-control">
                  <label className="label">
                     <span className="label-text">Descrition</span>
                  </label>
                  <textarea
                     defaultValue={actionData?.fields?.description}
                     name="description"
                     className="textarea h-full textarea-bordered focus:textarea-primary  w-full"
                     maxLength={160}
                     minLength={10}
                     required
                  ></textarea>
               </div>

               <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
               <input type="hidden" name="thumbnail" value={uploadedImage?.url || ""} className="hidden" required />
            </div>

            <div className="card bordered w-fit">
               <div className="form-control">
                  <label className="cursor-pointer label !justify-start gap-4">
                     <input type="checkbox" name="featuedArticle" className="toggle toggle-primary" />
                     <span className="label-text">Featured post</span>
                  </label>
               </div>
            </div>

            <ContentInput content={content} setContent={setContent} />
            <input type="hidden" name="content" value={content} className="hidden" required />

            <div className="flex items-center space-x-2">
               <button type="submit" className="btn btn-primary">
                  Publish
               </button>

               <Link to="/dashboard/articles" className="btn btn-ghost rounded-full">
                  Cancel
               </Link>
            </div>
         </form>
      </>
   )
}
