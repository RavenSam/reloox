import { User } from "@prisma/client"
import { PropsWithChildren, useState } from "react"
import { Link } from "remix"
import { linkType } from "types"

const navLinks: linkType[] = [
   { name: "dashboard", href: "/dashboard" },
   { name: "my articles", href: "/dashboard/articles" },
   { name: "create article", href: "/dashboard/articles/new" },
   { name: "settings", href: "/dashboard/settings" },
]

interface UserMenuProps {
   userLinks?: linkType[]
   user: any
}

export default function UserMenu({ userLinks = navLinks, user }: PropsWithChildren<UserMenuProps>): JSX.Element {
   const [menuOpen, setMenuOpen] = useState(false)

   const toggleClass = menuOpen
      ? "transition ease-in duration-100 transform opacity-100 scale-100 z-10"
      : "transition ease-out duration-200 transform opacity-0 scale-95 pointer-events-none"

   const handleBlur = () => {
      setTimeout(() => {
         setMenuOpen(false)
      }, 200)
   }

   return (
      <>
         <div className="relative">
            <button
               title={user?.username}
               aria-label="user menu"
               className="w-12 h-12"
               onClick={() => setMenuOpen(!menuOpen)}
               onBlur={handleBlur}
            >
               <img src={user?.profile?.avatar} width={48} height={48} className="mask mask-squircle" />
            </button>

            <div
               className={`origin-top-right absolute right-2 mt-2 p-2 w-56 rounded-xl shadow border bg-white  focus:outline-none ${toggleClass}`}
            >
               {userLinks.map((item) => (
                  <div key={item.name} className="">
                     <Link
                        to={item.href}
                        className="block capitalize px-4 py-3 tracking-wider text-sm font-semibold rounded-xl  text-gray-500 hover:text-black hover:bg-gray-200"
                     >
                        {item.name}
                     </Link>
                  </div>
               ))}

               <form action="/auth/logout" method="post" className="w-full">
                  <button
                     type="submit"
                     className="block capitalize text-left w-full px-4 py-3 tracking-wider text-sm font-semibold rounded-xl  text-gray-500 hover:text-black hover:bg-gray-200 "
                  >
                     Log out
                  </button>
               </form>
            </div>
         </div>
      </>
   )
}
