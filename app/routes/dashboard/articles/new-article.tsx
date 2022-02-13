import { useEffect, useState } from "react"
import slugify from "../../../../utilts/slugify"
import ImageUpload from "~/components/shared/ImageUpload"
import { ActionFunction, json, useActionData } from "remix"
import ContentInput from "~/components/ContentInput"

export const action: ActionFunction = async ({ request }) => {
   const fields = await request.formData()

   console.log(fields)

   if (true) {
      return json({ fieldErrors: { form: "Something went wrong" }, fields })
   }

   return null
}

export default function NewArticle(): JSX.Element {
   const actionData = useActionData()
   const [title, setTitle] = useState<string>("")
   const [slug, setSlug] = useState<string>("")
   const [uploadedImage, setUploadedImage] = useState<any>()
   const [content, setContent] = useState("")

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
                     required
                  ></textarea>
               </div>

               <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
               <input type="hidden" name="featuredImage" value={uploadedImage?.url || ""} className="hidden" required />
            </div>

            <div className="card bordered w-fit">
               <div className="form-control">
                  <label className="cursor-pointer label !justify-start gap-4">
                     <input type="checkbox" name="featuedArticle" className="toggle toggle-primary" />
                     <span className="label-text">Featured post</span>
                  </label>
               </div>
            </div>

            <ContentInput setContent={setContent} />
            <input type="hidden" name="content" value={content} className="hidden" required />

            <button type="submit" className="btn btn-primary">
               Save Post
            </button>
         </form>
      </>
   )
}
