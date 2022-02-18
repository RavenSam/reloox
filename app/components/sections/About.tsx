import React from "react"
import { Link } from "remix"

export default () => (
   <>
      <div className=" w-full max-w-5xl mx-auto py-20">
         <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full w-full md:w-1/2  mb-10 md:mb-0">
               <img className="object-cover object-center rounded-lg" alt="about us" src="/about.jpg" />
            </div>

            <div className="p-4 md:p-8 space-y-4 md:space-y-8 text-center md:text-left max-w-md mx-auto md:mx-0">
               <h2 className="text-2xl md:text-3xl lg:text-4xl capitalize">
                  About <span className="text-primary">Us</span>
               </h2>

               <p className=" text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit eveniet veritatis
                  minima, expedita dolorum tenetur unde facilis.
               </p>

               <Link to="/about" className="btn btn-primary">
                  Learn More
               </Link>
            </div>
         </div>
      </div>
   </>
)
