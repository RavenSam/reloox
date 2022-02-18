export default () => (
   <>
      <div className=" w-full max-w-5xl mx-auto py-20 ">
         <div className="bg-primary  rounded-lg flex items-center justify-center min-h-[350px]">
            <div className="text-center max-w-md mx-auto space-y-10">
               <h2 className="text-white text-2xl md:text-3xl lg:text-4xl capitalize">Subscribe to our newslatter</h2>

               <div className="relative  ">
                  <input
                     type="email"
                     placeholder="eg:johndoe@test.com"
                     className="w-full pr-16 input  input-bordered rounded-full "
                  />
                  <button className="absolute top-0 right-0 rounded-l-none btn btn-primary border border-white">
                     Subscribe
                  </button>
               </div>
            </div>
         </div>
      </div>
   </>
)
