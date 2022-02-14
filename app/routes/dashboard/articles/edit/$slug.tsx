import { useEffect, useState } from "react"
import slugify from "../../../../../utilts/slugify"
import ImageUpload from "~/components/shared/ImageUpload"
import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from "remix"
import ContentInput from "~/components/ContentInput"
import { ArticleTypes } from "types"
import { db } from "~/lib/db.server"

export const loader: LoaderFunction = async ({ params }) => {
   const post = await db.post.findUnique({ where: { slug: params.slug } })

   if (!post) {
      throw new Response("Not Found", {
         status: 404,
      })
   }

   const data = { post }

   return data
}

// export const action: ActionFunction = async ({ request }) => {
//    const form = await request.formData()

//    // Create user session
//    return redirect("/dashboard/articles")
// }

export default function EditArticle(): JSX.Element {
   const { post }: { post: ArticleTypes } = useLoaderData()

   const [title, setTitle] = useState<string>(post.title)
   const [slug, setSlug] = useState<string>(post.title)
   const [uploadedImage, setUploadedImage] = useState<any>(post.thumbnail)
   const [content, setContent] = useState(post.content)

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
                     defaultValue={post.description}
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

            <ContentInput content={content} setContent={setContent} />
            <input type="hidden" name="content" value={content} className="hidden" required />

            <div className="flex items-center">
               <button type="submit" className="btn btn-primary">
                  Save Changes
               </button>

               <Link to="/dashboard/articles" className="btn btn-ghost rounded-full">
                  Cancel
               </Link>
            </div>
         </form>
      </>
   )
}
