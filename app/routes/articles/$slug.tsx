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
      <div>
         <h1 className="text-2xl font-bold">{post.title}</h1>

         <div className="">
            <p className="">{post.content}</p>
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
