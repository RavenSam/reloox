import { useEffect, useState } from "react"
import slugify from "../../../../../utilts/slugify"
import ImageUpload from "~/components/shared/ImageUpload"
import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from "remix"
import ContentInput from "~/components/ContentInput"
import { ArticleTypes } from "types"
import { db } from "~/lib/db.server"
import { getUser } from "~/lib/session.server"
import checkFields from "../../../../../utilts/checkFields"
import AddCategories from "~/components/AddCategories"
import { Category } from "@prisma/client"

export const loader: LoaderFunction = async ({ params }) => {
   const post = await db.post.findUnique({ where: { slug: params.slug }, include: { categories: true } })
   const categories = await db.category.findMany({ take: 20, select: { id: true, name: true } })

   if (!post) {
      throw new Response("Not Found", {
         status: 404,
      })
   }

   return { post, categories }
}

export const action: ActionFunction = async ({ request }) => {
   //   Get the author
   const user = await getUser(request)

   if (!user) {
      return redirect("/auth/login")
   }

   const form = await request.formData()

   const fields = {
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description"),
      thumbnail: form.get("thumbnail"),
      content: form.get("content"),
   }

   const catsId =
      form
         .get("categories")
         ?.toString()
         .split(",")
         .map((x) => ({ id: Number(x) })) || []

   const pid = Number(form.get("pid"))

   checkFields(fields)

   // Update the post
   await db.user.update({
      where: { id: user.id },
      // @ts-ignore: Unreachable code error
      data: { posts: { update: { where: { id: pid }, data: { ...fields, categories: { set: catsId } } } } },
   })

   // Create user session
   return redirect("/dashboard/articles")
}

export default function EditArticle(): JSX.Element {
   const { post, categories }: { post: ArticleTypes; categories: Category[] } = useLoaderData()

   const [title, setTitle] = useState<string>(post.title)
   const [slug, setSlug] = useState<string>(post.title)
   const [uploadedImage, setUploadedImage] = useState<any>(post.thumbnail)
   const [content, setContent] = useState(post.content)
   const [selectedCategories, setSelectedCategories] = useState<any>(post.categories)

   useEffect(() => {
      setSlug(slugify(title))
   }, [title])

   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>Edit Article</h1>
         </div>

         <form method="post" className="max-w-3xl mx-auto py-12 space-y-8">
            <input type="hidden" name="pid" value={post.id} className="hidden" />

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
               <input type="hidden" name="thumbnail" value={uploadedImage?.url || ""} className="hidden" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="card bordered w-fit">
                  <div className="form-control">
                     <label className="cursor-pointer label !justify-start gap-4">
                        <input type="checkbox" name="featuedArticle" className="toggle toggle-primary" />
                        <span className="label-text">Featured post</span>
                     </label>
                  </div>
               </div>

               <AddCategories
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  categories={categories}
               />
               <input
                  type="hidden"
                  name="categories"
                  value={selectedCategories.map((el) => el.id)}
                  className="hidden"
                  required
               />
            </div>

            <ContentInput content={content} setContent={setContent} />
            <input type="hidden" name="content" value={content} className="hidden" required />

            <div className="flex items-center space-x-2">
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
