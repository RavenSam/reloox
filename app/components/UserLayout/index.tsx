import { User } from "@prisma/client"
import { PropsWithChildren } from "react"
import {
   MdOutlineSpaceDashboard,
   MdOutlineBookmarks,
   MdOutlineSettings,
   MdOutlineLogout,
   MdClear,
} from "react-icons/md"
import { BsFolder } from "react-icons/bs"
import { Link } from "remix"
import { linkType } from "types"
import Navbar from "./Navbar"

const dashboardLinks: linkType[] = [
   { name: "dashboard", href: "/dashboard", icon: MdOutlineSpaceDashboard },
   { name: "articles", href: "/dashboard/articles", icon: BsFolder },
   { name: "bookmarks", href: "/dashboard", icon: MdOutlineBookmarks },
   { name: "settings", href: "/dashboard", icon: MdOutlineSettings },
]

interface UserLayoutProps {
   user: User
}

export default function UserLayout({ children, user }: PropsWithChildren<UserLayoutProps>): JSX.Element {
   return (
      <>
         <div className="bg-base-200 drawer drawer-mobile h-screen overflow-y-auto ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="relative drawer-content bg-gray-100">
               <Navbar user={user} />

               <div className="">{children}</div>
            </div>

            <div className="drawer-side shadow-2xl border-r ">
               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
               <ul className="relative menu p-4 pt-16 overflow-y-auto w-screen max-w-[18rem] bg-gray-900 text-gray-100">
                  <label
                     htmlFor="my-drawer-2"
                     className="md:hidden btn btn-square bg-transparent hover:bg-white absolute top-2 right-2 hover:text-primary"
                  >
                     <MdClear size={20} />
                  </label>

                  {dashboardLinks.map((el: any, i) => (
                     <li key={i}>
                        <Link
                           to={el.href}
                           className="flex items-center gap-2 capitalize font-medium hover:text-primary hover:bg-white"
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
                           className="flex items-center gap-2 capitalize font-medium hover:text-primary hover:bg-white w-full px-4 py-3 rounded-lg"
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
