import { LoaderFunction, MetaFunction, Outlet, redirect, useLoaderData } from "remix"
import UserLayout from "~/components/UserLayout"
import { getUser } from "~/lib/session.server"

export const loader: LoaderFunction = async ({ request }) => {
   const user = await getUser(request)

   if (!user) {
      return redirect("/auth/login")
   }

   return { user }
}

export default function DashboardLayout(): JSX.Element {
   const loaderData = useLoaderData()

   return (
      <>
         <UserLayout user={loaderData?.user}>
            <div className="p-4">
               <Outlet />
            </div>
         </UserLayout>
      </>
   )
}

export const meta: MetaFunction = () => {
   const title = "Dashboard | ReblooX"
   const description = `Rebloox write and read | Find the best stories, articles and post. And have fun time writing your onw stories for other people to enjoy.`

   return { title, description }
}
