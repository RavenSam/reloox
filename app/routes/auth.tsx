import { Outlet, Link, useLocation } from "remix"
import { BiHome } from "react-icons/bi"

const tabs = [
   { name: "login", href: "/auth/login" },
   { name: "sign up", href: "/auth/signup" },
]

export default function Auth(): JSX.Element {
   const { pathname } = useLocation()

   return (
      <>
         <div className="relative flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md mx-auto py-8">
               <Link
                  to="/"
                  title="Go Home"
                  aria-label="Home"
                  className="absolute top-5 left-5 btn btn-ghost btn-circle"
               >
                  <BiHome size={20} />
               </Link>

               <div className="tabs ">
                  {tabs.map((tab, i) => (
                     <Link
                        key={i}
                        to={tab.href}
                        className={`tab tab-bordered font-bold capitalize md:text-2xl tab-lg ${
                           pathname === tab.href && "tab-active text-black"
                        }`}
                     >
                        <span>{tab.name}</span>
                     </Link>
                  ))}
               </div>

               <Outlet />
            </div>
         </div>
      </>
   )
}
