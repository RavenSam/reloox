import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix"
import { ArticleTypes } from "types"
import { db } from "~/lib/db.server"

export const loader: LoaderFunction = async ({ params }) => {
   const post = await db.post.findUnique({
      where: { slug: params.slug },
      include: { author: { select: { id: true, email: true, username: true } }, categories: true },
   })

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
         <div className="relative -mt-12">
            <div className="overflow-hidden max-h-[90vh] rounded-lg">
               <img src={post?.thumbnail} alt={post?.title} className="w-full h-full object-cover object-center" />
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center  rounded-lg">
               <div className="max-w-4xl w-full mx-auto p-4">
                  <div className="flex items-center">
                     {post.categories.map((cat) => (
                        <Link
                           key={cat.id}
                           to={`/category/${cat.id}`}
                           className=" text-white text-sm border border-white hover:bg-white hover:text-primary  rounded-full px-4 py-1 capitalize cursor-pointer m-1"
                        >
                           {cat.name}
                        </Link>
                     ))}
                  </div>

                  <h1 className="text-white text-3xl md:text-4xl lg:text-5xl capitalize text-center md:text-left mt-2">
                     {post.title}
                  </h1>

                  <p className="text-sm text-gray-200 space-x-2 mt-4">
                     <span>{post.author.username}</span>
                     <span>&#8226;</span>
                     <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </p>
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
   const { post }: { post: ArticleTypes } = data

   const title = post?.title
   const description = post.description
   const keywords = post.categories?.map((x) => x.name).join(", ")

   return { title, description, keywords }
}
