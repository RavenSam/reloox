import { Outlet } from "remix"
import UserLayout from "~/components/UserLayout"

export default function DashboardLayout(): JSX.Element {
   return (
      <>
         <UserLayout>
            <div className="p-4">
               <Outlet />
            </div>
         </UserLayout>
      </>
   )
}
