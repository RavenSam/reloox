import { PropsWithChildren } from "react"
import {
   MdOutlineSpaceDashboard,
   MdOutlineBookmarks,
   MdOutlineSettings,
   MdOutlineNote,
   MdOutlineLogout,
   MdOutlineHome,
} from "react-icons/md"
import { Link } from "remix"
import { linkType } from "types"
import Navbar from "./Navbar"

const dashboardLinks: linkType[] = [
   { name: "dashboard", href: "/dashboard", icon: MdOutlineSpaceDashboard },
   { name: "articles", href: "/dashboard/articles", icon: MdOutlineNote },
   { name: "bookmarks", href: "/dashboard", icon: MdOutlineBookmarks },
   { name: "settings", href: "/dashboard", icon: MdOutlineSettings },
]

export default function UserLayout({ children }: PropsWithChildren<{}>): JSX.Element {
   return (
      <>
         <div className="bg-base-200 drawer drawer-mobile h-screen overflow-y-auto ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="relative drawer-content bg-gray-100">
               <Navbar />

               <div className="">{children}</div>
            </div>

            <div className="drawer-side shadow-2xl border-r ">
               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
               <ul className="menu p-4 pt-16 overflow-y-auto w-60 bg-white text-gray-700">
                  {dashboardLinks.map((el: any, i) => (
                     <li key={i}>
                        <Link
                           to={el.href}
                           className="flex items-center gap-2 capitalize font-medium hover:text-primary"
                        >
                           <el.icon size={25} />
                           <span>{el.name}</span>
                        </Link>
                     </li>
                  ))}

                  <li className="mt-auto">
                     <form action="/auth/logout" method="post">
                        <button
                           type="submit"
                           className="flex items-center gap-2 capitalize font-medium hover:text-primary "
                        >
                           <MdOutlineLogout size={25} />
                           <span>Log out</span>
                        </button>
                     </form>
                  </li>
               </ul>
            </div>
         </div>
      </>
   )
}
