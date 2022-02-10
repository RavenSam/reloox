import { PropsWithChildren } from "react"
import Navbar from "./Navbar"

export default function UserLayout({ children }: PropsWithChildren<{}>): JSX.Element {
   return (
      <>
         <div className="bg-base-200 drawer drawer-mobile h-screen overflow-y-auto ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="relative drawer-content">
               <Navbar />

               <div className="">{children}</div>
            </div>

            <div className="drawer-side shadow-2xl border-r">
               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
               <ul className="menu p-4 overflow-y-auto w-72 bg-white text-gray-700">
                  <li>
                     <a>Menu Item</a>
                  </li>
                  <li>
                     <a>Menu Item</a>
                  </li>
               </ul>
            </div>
         </div>
      </>
   )
}
