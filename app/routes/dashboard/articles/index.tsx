import { BiPlus } from "react-icons/bi"
import { Link, LoaderFunction, useLoaderData } from "remix"
import ArticlesTable from "~/components/ArticlesTable"
import { db } from "~/lib/db.server"
import { getUser } from "~/lib/session.server"

export const loader: LoaderFunction = async ({ request }) => {
   const user = await getUser(request)
   const articles = await db.user.findUnique({
      where: { id: user?.id },
      select: {
         posts: {
            select: {
               id: true,
               slug: true,
               createdAt: true,
               updatedAt: true,
               description: true,
               title: true,
               categories: true,
            },
            orderBy: { updatedAt: "desc" },
         },
      },
   })

   return { articles }
}

export default function Articles(): JSX.Element {
   const loaderData = useLoaderData()

   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>Articles</h1>

            <div className="">
               <Link to="/dashboard/articles/new-article" className="btn btn-outline btn-primary gap-2">
                  <BiPlus size={18} />
                  New Article
               </Link>
            </div>
         </div>

         <ArticlesTable articles={loaderData?.articles?.posts} />
      </>
   )
}
