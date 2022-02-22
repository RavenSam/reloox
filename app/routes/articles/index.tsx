import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix"
import { ArticlesTypes } from "types"
import { db } from "~/lib/db.server"
import truncate from "../../../utilts/truncate"

export const loader: LoaderFunction = async () => {
   const articles = await db.post.findMany({
      take: 20,
      select: {
         id: true,
         title: true,
         slug: true,
         createdAt: true,
         description: true,
         thumbnail: true,
         categories: true,
         author: { select: { id: true, username: true, profile: { select: { avatar: true } } } },
      },
      orderBy: { createdAt: "desc" },
   })

   return { articles }
}

export default function PostItems() {
   const { articles }: { articles: ArticlesTypes[] } = useLoaderData()

   return (
      <div className="w-full max-w-5xl mx-auto p-4">
         <div className="">
            <h1 className="capitalize">All the posts</h1>

            <hr className="my-10" />

            <div className="w-full max-w-4xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((el) => (
                     <div className="w-full " key={el.id}>
                        <div className=" border rounded-xl">
                           {el.thumbnail && el?.thumbnail?.length > 3 && (
                              <figure className="h-[200px] rounded-xl overflow-hidden">
                                 <img src={el.thumbnail} alt={el.title} className="object-cover w-full h-full" />
                              </figure>
                           )}
                           <div className="p-2">
                              <Link
                                 to={`/articles/${el.slug}`}
                                 title={el.title}
                                 className="font-bold md:text-lg lg:text-xl"
                              >
                                 {truncate(el.title)}
                              </Link>
                              <p className="text-xs sm:text-sm md:text-base text-gray-600 py-1">
                                 {truncate(el.description, 100)}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export const meta: MetaFunction = () => {
   const title = "Posts - ReBlox"
   const description = "A react blog build with remix and tailwindCSS"
   const keywords = "react, tailwind, javascript, remix"

   return { title, description, keywords }
}
