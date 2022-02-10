import { PropsWithChildren, useEffect, useState } from "react"
import { BiMenu } from "react-icons/bi"
import { Link } from "remix"
import { linkType } from "types"

interface MenuProps {
   navLinks: linkType[]
}

export default function MenuSM({ navLinks }: PropsWithChildren<MenuProps>): JSX.Element {
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
