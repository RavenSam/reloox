import { Link, useLocation } from "remix"
import { linkType } from "types"
import MenuSM from "./MenuSM"

const navLinks: linkType[] = [
   { name: "home", href: "/" },
   { name: "login", href: "/auth/login" },
   { name: "sign up", href: "/auth/signup" },
]

export default function Navbar(): JSX.Element {
   const { pathname } = useLocation()

   return (
      <>
         <header className="fixed z-10 top-0 left-0 w-full p-2 lg:px-4">
            <div className="navbar mb-2 shadow-lg bg-white border rounded-box">
               <div className="flex-1 px-2 mx-2">
                  <Link to="/" className="text-lg font-bold">
                     ReLiX
                  </Link>
               </div>

               <div className="flex-none hidden px-2 mx-2 md:flex">
                  <div className="flex items-stretch">
                     {navLinks.map((el, i) => (
                        <Link
                           key={i}
                           to={el.href}
                           className={`${pathname === el.href && "text-primary"} btn btn-ghost  rounded-btn`}
                        >
                           {el.name}
                        </Link>
                     ))}
                  </div>
               </div>

               <MenuSM navLinks={navLinks} />
            </div>
         </header>
      </>
   )
}
