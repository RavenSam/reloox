import React from "react"

export default function About() {
   return (
      <>
         <div className="w-full max-w-[1400px] mx-auto space-y-28 md:space-y-36">
            <div className="grid grid-cols-1 md:grid-cols-12">
               <div className="col-span-7 w-full p-4 md:p-0 md:-ml-3  ">
                  <img
                     className="object-cover w-full object-center max-h-[550px] rounded-lg"
                     alt="about us"
                     src="/about.jpg"
                  />
               </div>

               <div className="p-4 md:p-8 col-span-5">
                  <div className="bg-white border shadow-lg rounded-lg mx-auto -mt-28 md:mt-0 md:-ml-28 w-fit">
                     <div className="p-4 md:p-8 space-y-4 md:space-y-8 text-center md:text-left max-w-md mx-auto md:mx-0">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl capitalize">
                           Who are <span className="text-primary">We</span>?
                        </h2>

                        <div className="space-y-2">
                           <p className=" text-gray-600">
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit
                              eveniet veritatis minima, expedita dolorum tenetur unde facilis.
                           </p>

                           <p className=" text-gray-600">
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit
                              eveniet veritatis minima, expedita dolorum tenetur unde facilis.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex  flex-col-reverse md:grid grid-cols-1 md:grid-cols-12 ">
               <div className="p-4 md:p-8 col-span-5 z-10">
                  <div className="bg-white border shadow-lg rounded-lg mx-auto -mt-28 md:mt-0 md:-mr-28 w-fit">
                     <div className="p-4 md:p-8 space-y-4 md:space-y-8 text-center md:text-left max-w-md mx-auto md:mx-0">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl capitalize">
                           Want to know <span className="text-primary">more</span>?
                        </h2>

                        <div className="space-y-2">
                           <p className=" text-gray-600">
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit
                              eveniet veritatis minima, expedita dolorum tenetur unde facilis.
                           </p>

                           <p className=" text-gray-600">
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit
                              eveniet veritatis minima, expedita dolorum tenetur unde facilis.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-span-7 w-full p-4 md:p-0 md:-mr-3 ">
                  <img
                     className="object-cover w-full object-center max-h-[550px] rounded-lg"
                     alt="about us"
                     src="/about.jpg"
                  />
               </div>
            </div>
         </div>
      </>
   )
}
