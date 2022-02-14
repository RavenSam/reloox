import { redirect } from "remix"
import type { ActionFunction, LoaderFunction } from "remix"
import { getUser } from "~/lib/session.server"
import { db } from "~/lib/db.server"

export const action: ActionFunction = async ({ request }) => {
   let url = new URL(request.url)
   let pid = Number(url.searchParams.get("post"))

   //   Get the author
   const user = await getUser(request)

   if (!user) {
      return redirect("/auth/login")
   }

   // Update the post
   await db.user.update({ where: { id: user.id }, data: { posts: { delete: { id: pid } } } })

   return redirect("/dashboard/articles/delete")
}

export const loader: LoaderFunction = async () => {
   return redirect("/dashboard/articles")
}
