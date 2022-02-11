import { BiImageAdd, BiPencil } from "react-icons/bi"
import { useState, useEffect, ChangeEvent, PropsWithChildren, Dispatch } from "react"
import useUploadImage from "~/hooks/useUploadImage"
import { isEmpty } from "lodash"

interface ImageUploadProps {
   uploadedImage: any
   setUploadedImage: Dispatch<any>
}

export default function ImageUpload({
   setUploadedImage,
   uploadedImage,
}: PropsWithChildren<ImageUploadProps>): JSX.Element {
   const [preview, setPreview] = useState<string | undefined>()
   const [imageFile, setImageFile] = useState<File | string>("")
   const { isLoading, uploadedData, error } = useUploadImage({ imageFile })

   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      if (e?.target?.files) {
         setImageFile(e?.target?.files[0])

         const reader = new FileReader()

         reader.onload = function (onLoadEvent) {
            const p = onLoadEvent?.target?.result
            const pToString = typeof p === "string" ? p : p?.toString()
            setPreview(pToString)
         }

         reader.readAsDataURL(e?.target?.files[0])
      }
   }

   return (
      <>
         <div className="form-control">
            <label className="label">
               <span className="label-text">Featured Image</span>
            </label>

            <div className=" group flex items-center justify-center w-full ">
               {preview || isLoading ? (
                  <div className="relative h-44 w-full bg-gray-500 rounded-lg overflow-hidden">
                     <img src={preview} className={`w-full h-full object-cover ${isLoading && "blur-sm"}`} alt="" />
                     <div className="absolute inset-0  flex items-center justify-center ">
                        {isLoading ? (
                           <div className="text-white">
                              <div
                                 style={{ borderTopColor: "transparent" }}
                                 className="w-8 h-8 border-2 border-white border-solid rounded-full animate-spin"
                              />
                           </div>
                        ) : (
                           <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100">
                              <label
                                 htmlFor="image"
                                 className="border border-white hover:bg-white hover:text-gray-700 p-2 rounded-xl cursor-pointer"
                              >
                                 <BiPencil size={20} />
                              </label>
                              <input type="file" id="image" onChange={handleChange} className="opacity-0 w-0 h-0" />
                           </div>
                        )}
                     </div>
                  </div>
               ) : (
                  <label className="flex flex-col w-full h-44 border-2 border-dashed rounded-lg hover:bg-gray-100 cursor-pointer">
                     <div className="flex flex-col h-full items-center justify-center pt-7">
                        <BiImageAdd size={30} className="group-hover:text-primary text-gray-400" />
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-primary capitalize text-center">
                           {!isEmpty(error) && <span className="text-pink-500 text-xs">Something went wrong</span>}
                           <br />
                           Select a photo
                        </p>
                     </div>
                     <input type="file" onChange={handleChange} className="opacity-0" />
                  </label>
               )}
            </div>
         </div>
      </>
   )
}
