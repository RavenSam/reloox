import { useEffect, useState } from "react"
import slugify from "../../../../../utilts/slugify"
import ImageUpload from "~/components/shared/ImageUpload"
import type { ActionFunction } from "remix"
import ContentInput from "~/components/ContentInput"

export const action: ActionFunction = async ({ request }) => {
   const form = await request.formData()

   console.log(form)
   return null
}

export default function EditArticle(): JSX.Element {
   const [title, setTitle] = useState<string>("")
   const [slug, setSlug] = useState<string>("")
   const [uploadedImage, setUploadedImage] = useState<any>()
   const [content, setContent] = useState("")

   useEffect(() => {
      setSlug(slugify(title))
   }, [title])

   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>Edit Article</h1>
         </div>

         <form method="post" className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="form-control flex-1">
                  <label className="label">
                     <span className="label-text">Article Title</span>
                  </label>
                  <input
                     type="text"
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
