import { Link, useLocation } from "remix"
import { linkType } from "types"
import MenuSM from "./MenuSM"
import UserMenu from "./UserMenu"

const navLinks: linkType[] = [
   { name: "home", href: "/" },
   { name: "articles", href: "/articles" },
   { name: "Categories", href: "/category" },
]

export default function Navbar({ user }): JSX.Element {
   const { pathname } = useLocation()

   return (
      <>
         <header className="fixed z-20 top-0 right-0 w-full p-2 lg:px-4">
            <div className="navbar mb-2 shadow bg-white border rounded-box">
               <div className="flex-1 px-2 mx-2">
                  <Link to="/" className="text-xl font-extrabold">
                     ReLoo<span className="text-primary text-2xl">X</span>
                  </Link>
               </div>

               <div className="flex-none hidden px-2 mx-2 md:flex">
                  <div className="flex items-stretch space-x-1">
                     {navLinks.map((el, i) => (
                        <Link
                           key={i}
                           to={el.href}
                           className={`${
                              pathname === el.href ? "text-primary" : "text-gray-700 hover:text-black"
                           } btn btn-ghost  rounded-btn capitalize`}
                        >
                           {el.name}
                        </Link>
                     ))}

                     {user ? (
                        <UserMenu user={user} />
                     ) : (
                        <Link to={"/auth/login"} className={`btn btn-primary   capitalize`}>
                           Login
                        </Link>
                     )}
                  </div>
               </div>

               <MenuSM user={user} navLinks={navLinks} />
            </div>
         </header>
      </>
   )
}
