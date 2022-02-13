import { redirect } from "remix"
import type { ActionFunction, LoaderFunction } from "remix"
import { logout } from "~/lib/session.server"

export const action: ActionFunction = async ({ request }) => {
   return logout(request)
}

export const loader: LoaderFunction = async () => {
   return redirect("/")
}
