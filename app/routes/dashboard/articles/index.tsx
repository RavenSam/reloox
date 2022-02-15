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
               <Link
                  to="/dashboard/articles/new"
                  className="btn btn-outline btn-primary gap-2 btn-sm md:btn-md px-4 md:px-8"
               >
                  <BiPlus size={18} />
                  New Article
               </Link>
            </div>
         </div>

         {loaderData?.articles?.posts?.length > 0 ? (
            <ArticlesTable articles={loaderData?.articles?.posts} />
         ) : (
            <div className="flex text-center items-center justify-center min-h-[13rem]">
               <p className="text-gray-600 font-medium text-xl leading-10">
                  You don't have any article <br /> Click{" "}
                  <Link to="/dashboard/articles/new" className="text-primary underline">
                     here
                  </Link>{" "}
                  to create one
               </p>
            </div>
         )}
      </>
   )
}
