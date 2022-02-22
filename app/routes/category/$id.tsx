import { Category } from "@prisma/client"
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix"
import { ArticlesTypes } from "types"
import truncate from "../../../utilts/truncate"
import { db } from "~/lib/db.server"

export const loader: LoaderFunction = async ({ params }) => {
   const articles = await db.post.findMany({
      where: { categories: { some: { id: { equals: Number(params.id) } } } },
      take: 20,
      select: {
         id: true,
         title: true,
         slug: true,
         createdAt: true,
         description: true,
         thumbnail: true,
         categories: true,
         author: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
   })

   const category = await db.category.findUnique({ where: { id: Number(params.id) } })

   return { articles, category }
}

export default function Category() {
   const { articles, category }: { articles: ArticlesTypes[]; category: Category } = useLoaderData()

   return (
      <>
         <div className="w-full max-w-5xl mx-auto p-4">
            {articles.length !== 0 ? (
               <div className="">
                  <h1 className="capitalize">
                     All the posts with <span className="text-primary">{category.name} </span> category
                  </h1>

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
            ) : (
               <div className="min-h-[80] flex items-center justify-center text-center">
                  <p className="text-xl md:text-3xl text-gray-600 capitalize">
                     no article found with <span className="text-primary">{category.name} </span> category{" "}
                  </p>
               </div>
            )}
         </div>
      </>
   )
}

export const meta: MetaFunction = ({ data }) => {
   const { category } = data

   const title = "All the posts of " + category?.name
   const description = `Rebloox | get all the posts that have ${category.name} category`

   return { title, description }
}
