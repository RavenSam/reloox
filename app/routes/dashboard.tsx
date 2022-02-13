import { LoaderFunction, Outlet, redirect, useLoaderData } from "remix"
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
