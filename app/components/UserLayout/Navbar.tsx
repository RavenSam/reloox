import { BiMenu, BiSearch, BiBell } from "react-icons/bi"
import { Link } from "remix"

export default function Navbar(): JSX.Element {
   return (
      <>
         <header className="sticky top-0 left-0 w-full p-1">
            <div className="navbar mb-2 shadow border bg-white text-gray-700 rounded-box space-x-4">
               <div className="flex-none lg:hidden px-2">
                  <label htmlFor="my-drawer-2" className="drawer-button  cursor-pointer">
                     <BiMenu size={25} />
                  </label>
               </div>

               <div className="flex-1">
                  <Link to="/" className="text-2xl font-extrabold block">
                     ReLoo<span className="text-primary ">X</span>
                  </Link>
               </div>

               <div className="flex-1 lg:flex-none hidden sm:block">
                  <div className="relative">
                     <input type="text" placeholder="Search" className="w-full pr-16 input  input-bordered" />
                     <button className="absolute top-0 right-0 rounded-l-none btn btn-ghost">
                        <BiSearch size={25} />
                     </button>
                  </div>
               </div>
               <div className="flex-none sm:hidden">
                  <button className="btn btn-square btn-ghost">
                     <BiSearch size={25} />
                  </button>
               </div>
               <div className="flex-none">
                  <button className="btn btn-square btn-ghost">
                     <BiBell size={25} />
                  </button>
               </div>
               <div className="flex-none">
                  <div className="avatar">
                     <div className="rounded-full w-10 h-10 m-1">
                        <img src="" />
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </>
   )
}
