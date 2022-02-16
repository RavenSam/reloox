import { Link, LoaderFunction, useLoaderData } from "remix"
import ArticlesTable from "~/components/ArticlesTable"
import UserStats from "~/components/UserStats"
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
            orderBy: { createdAt: "desc" },
         },
      },
   })

   return { user, articles }
}

export default function Dashboard(): JSX.Element {
   const loaderData = useLoaderData()

   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>Dashboard</h1>
         </div>

         <div className="mb-14">
            <UserStats />
         </div>

         {loaderData?.articles?.posts?.length > 0 ? (
            <>
               <div className="flex items-center justify-between  py-4 -mb-10">
                  <h2>Recently Created</h2>

                  <Link to="/dashboard/articles" className="text-gray-600 hover:underline hover:text-primary">
                     See More
                  </Link>
               </div>

               <ArticlesTable articles={loaderData?.articles?.posts?.slice(0, 3)} />
            </>
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
