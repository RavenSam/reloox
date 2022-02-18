import { LoaderFunction, MetaFunction, useLoaderData } from "remix"
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

export default function Post() {
   const { post }: { post: ArticleTypes } = useLoaderData()

   return (
      <div className="p-4">
         <div className="relative -mt-10">
            <div className="overflow-hidden max-h-[90vh] rounded-lg">
               <img src="/about.jpg" alt={post?.title} className="w-full h-full object-cover object-center" />
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center  rounded-lg">
               <div className="max-w-4xl w-full mx-auto p-4">
                  <h1 className="text-white text-3xl md:text-4xl lg:text-5xl capitalize text-center md:text-left">
                     {post.title}
                  </h1>
               </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full  h-[30vh] bg-gradient-to-t from-gray-100" />
         </div>

         <div className="max-w-2xl w-full mx-auto">
            <article className="prose">
               <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
         </div>
      </div>
   )
}

export const meta: MetaFunction = ({ data }) => {
   const title = data?.post?.title
   const description = "A react blog build with remix and tailwindCSS"
   const keywords = "react, tailwind, javascript, remix"

   return { title, description, keywords }
}
