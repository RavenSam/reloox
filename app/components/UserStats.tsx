import { BsBook, BsEye, BsHourglass, BsFileText } from "react-icons/bs"

const stats = [
   { name: "articles", value: 0, icon: BsFileText, cl: "text-pink-500" },
   { name: "vues", value: 0, icon: BsEye, cl: "text-blue-400" },
   { name: "reading", value: 0, icon: BsBook, cl: "text-emerald-400" },
   { name: "time", value: "0h", icon: BsHourglass, cl: "text-violet-400" },
]

export default function UserStats() {
   return (
      <>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {stats.map((item, i) => (
               <div
                  key={i}
                  className="bg-white rounded-xl flex items-center p-4 lg:p-6 border  shadow space-x-5 hover:bg-gray-200  cursor-pointer"
               >
                  <span className="min-w-[30px]">
                     <item.icon size={30} className={item.cl} />
                  </span>

                  <div className="flex flex-col space-y-2">
                     <span className="text-gray-600   capitalize font-medium text-sm sm:text-base">{item.name}</span>
                     <span className="font-extrabold text-lg md:text-xl lg:text-2xl text-500">{item.value}</span>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}
