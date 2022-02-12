import { Link, MetaFunction, useLoaderData } from "remix"
import { ArticlesTypes } from "types"
import { db } from "~/lib/db.server"

export const loader = async () => {
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

   console.log(articles)
   return (
      <div>
         <h1 className="">Articles</h1>

         <div className="">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {articles.map((article) => (
                  <div key={article.id} className="rounded-xl border p-4 shadow">
                     <Link to={`/articles/${article.slug}`}>
                        <h2>{article.title}</h2>
                     </Link>
                     <p className="text-gray-600 text-sm">{new Date(article.createdAt).toLocaleDateString()}</p>
                  </div>
               ))}
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
