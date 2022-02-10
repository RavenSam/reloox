import { Outlet, Link, useLocation } from "remix"
import UserLayout from "~/components/UserLayout"

export default function DashboardLayout(): JSX.Element {
   return (
      <div>
         <UserLayout>
            <Outlet />
         </UserLayout>
      </div>
   )
}
