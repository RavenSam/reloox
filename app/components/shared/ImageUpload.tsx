import { BiImageAdd } from "react-icons/bi"

export default function ImageUpload(): JSX.Element {
   return (
      <>
         <div className="form-control">
            <label className="label">
               <span className="label-text">Featured Image</span>
            </label>

            <div className=" group flex items-center justify-center w-full">
               <label className="flex flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-primary  ">
                  <div className="flex flex-col items-center justify-center pt-7">
                     <BiImageAdd size={30} className="group-hover:text-primary " />
                     <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-primary capitalize">
                        Select a photo
                     </p>
                  </div>
                  <input type="file" className="opacity-0" />
               </label>
            </div>
         </div>
      </>
   )
}
