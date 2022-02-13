import { LoaderFunction, useLoaderData } from "remix"
import { getUser } from "~/lib/session.server"

export const loader: LoaderFunction = async ({ request }) => {
   const user = await getUser(request)

   return { user }
}

export default function Dashboard(): JSX.Element {
   const loaderData = useLoaderData()
   console.log(loaderData?.user)

   return (
      <>
         <div className="max-w-6xl mx-auto p-4">
            <h1>Welcome {loaderData?.user?.username}</h1>
         </div>
      </>
   )
}
