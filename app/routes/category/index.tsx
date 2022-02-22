import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix"
import { db } from "~/lib/db.server"

export const loader: LoaderFunction = async () => {
   const categories = await db.category.findMany({ take: 50, include: { _count: { select: { posts: true } } } })

   return { categories }
}

export default function Categories() {
   const { categories } = useLoaderData()

   return (
      <div className="max-w-2xl mx-auto p-4">
         <h1 className="capitalize">Categories</h1>

         <hr className="my-10" />

         <div className=" flex items-start justify-center  min-h-[70vh]">
            <div className="flex items-start flex-wrap ">
               {categories.map((cat) => (
                  <Link
                     title={`${cat.name} category have ${cat._count.posts} posts`}
                     key={cat.id}
                     to={`/category/${cat.id}`}
                     className="flex items-center gap-2 capitalize border hover:border-primary hover:text-primary  rounded-full px-6 py-2 cursor-pointer m-1"
                  >
                     <span>{cat.name}</span>
                     <span className="border-l px-2">{cat._count.posts}</span>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   )
}

export const meta: MetaFunction = () => {
   const title = "All Categories - ReBloox"
   const description = "All Categories - ReBloox | A react blog build with remix and tailwindCSS"
   const keywords = "react, tailwind, javascript, remix"

   return { title, description, keywords }
}
