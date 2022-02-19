import { PropsWithChildren, useEffect, useState } from "react"
import { BiMenu } from "react-icons/bi"
import { HiCog, HiLogout, HiOutlineCog, HiOutlineLogout } from "react-icons/hi"
import { MdClear } from "react-icons/md"
import { Link } from "remix"
import { linkType } from "types"

interface MenuProps {
   navLinks: linkType[]
   user: any
}

export default function MenuSM({ navLinks, user }: PropsWithChildren<MenuProps>): JSX.Element {
   const [open, setOpen] = useState<boolean>(false)

   useEffect(() => {
      document.body.style.overflowY = open ? "hidden" : "auto"
   }, [open])

   return (
      <>
         <div className="flex-none md:hidden block">
            <button aria-label="Menu" className="btn btn-square btn-ghost" onClick={() => setOpen(true)}>
               <BiMenu size={25} />
            </button>

            <div
               className={`absolute inset-0 bg-[#0000006e]  w-full h-screen transition-all duration-500 ${
                  open ? "opacity-1" : "opacity-0 pointer-events-none"
               }`}
               onClick={() => setOpen(false)}
            />

            <div
               className={`absolute  right-0 top-0 h-screen w-full  transform transition-all duration-500 bg-white z-50 shadow-xl max-w-xs  ${
                  open ? "translate-x-0 opacity-1" : "translate-x-full opacity-0"
               }`}
            >
               <button
                  onClick={() => setOpen(false)}
                  className="md:hidden btn btn-square bg-transparent text-gray-700 hover:bg-primary hover:text-white absolute top-2 right-2 "
               >
                  <MdClear size={20} />
               </button>

               <div className="p-4 mt-16">
                  {user ? (
                     <div className="">
                        <Link to="/dashboard" className="flex items-center gap-4">
                           <img src={user?.profile?.avatar} width={70} height={70} className="mask mask-squircle" />
                           <div>
                              <p className="text-black font-medium">{user.username}</p>
                              <p className="text-gray-600 text-xs">{user.email}</p>
                           </div>
                        </Link>

                        <hr className="my-4" />

                        <div className="flex items-center justify-evenly ">
                           <Link to="/dashboard/settings" className="btn btn-outline btn-circle">
                              <HiOutlineCog size={25} />
                           </Link>

                           <form action="/auth/logout" method="post">
                              <button type="submit" className="btn btn-outline btn-circle">
                                 <HiOutlineLogout size={25} />
                              </button>
                           </form>
                        </div>
                     </div>
                  ) : (
                     <div className=" space-y-2 ">
                        <Link to="/auth/login" className="btn btn-primary w-full">
                           Login
                        </Link>

                        <Link to="/auth/signup" className="btn btn-primary btn-outline w-full">
                           Sign Up
                        </Link>
                     </div>
                  )}
               </div>

               <hr />

               <ul className="menu p-4 overflow-y-auto w-full  text-base-content">
                  {navLinks.map((el, i) => (
                     <li key={i} className="capitalize font-medium">
                        <Link to={el.href}>{el.name}</Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </>
   )
}
