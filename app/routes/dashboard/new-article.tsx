import { useEffect, useState } from "react"
import slugify from "../../../utilts/slugify"
import ImageUpload from "~/components/shared/ImageUpload"

export default function NewArticle(): JSX.Element {
   const [title, setTitle] = useState<string>("")
   const [slug, setSlug] = useState<string>("")

   useEffect(() => {
      setSlug(slugify(title))
   }, [title])

   return (
      <>
         <div>
            <h2>New Article</h2>
         </div>

         <form method="post" className="max-w-2xl mx-auto py-12 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="form-control flex-1">
                  <label className="label">
                     <span className="label-text">Post Title</span>
                  </label>
                  <input
                     type="text"
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
                     name="content"
                     className="textarea h-full textarea-bordered focus:textarea-primary  w-full"
                     required
                  ></textarea>
               </div>

               <ImageUpload />
            </div>

            <div className="card bordered">
               <div className="form-control">
                  <label className="cursor-pointer label !justify-start gap-4">
                     <input type="checkbox" className="toggle toggle-primary" />
                     <span className="label-text">Featured post</span>
                  </label>
               </div>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Post Content</span>
               </label>
               <textarea
                  name="content"
                  className="textarea textarea-bordered focus:textarea-primary  w-full"
                  rows={5}
                  required
               ></textarea>
            </div>
         </form>
      </>
   )
}
