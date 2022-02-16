import { Link } from "remix"

export default function Hero() {
   return (
      <>
         <div className="relative w-full max-w-5xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
               <div className="flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl capitalize">
                     Read and Write <br /> Fun <span className="text-primary">Stories</span>
                     <br /> in one place
                  </h1>

                  <p className="max-w-md">
                     Find the best stories, articles and post. And have fun time writing your onw stories for other
                     people to enjoy.
                  </p>

                  <div className="flex items-center sm:space-x-2">
                     <Link to="/auth/login" className="btn btn-primary text-sm sm:text-base">
                        Tell Us a Story
                     </Link>
                     <Link to="/blog" className="hidden sm:flex btn btn-ghost rounded-full text-sm sm:text-base">
                        Explore stories
                     </Link>
                  </div>
               </div>

               <div className=" hidden md:block">
                  <img src="/img-1.png" alt="fun stories" />
               </div>
            </div>
         </div>
      </>
   )
}
