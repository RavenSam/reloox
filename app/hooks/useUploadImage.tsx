import { PropsWithChildren, useEffect, useState } from "react"

interface UploadProps {
   imageFile: File | string
}

export default function useUploadImage({ imageFile }: UploadProps) {
   const [uploadedData, setUploadedData] = useState<any>({})
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<any>({})

   const uploadImage = async () => {
      try {
         setIsLoading(true)
         const url = "https://api.cloudinary.com/v1_1/djmrxybvj/image/upload"

         const formData = new FormData()
         formData.append("file", imageFile)
         formData.append("upload_preset", "reloox-img")

         const res = await fetch(url, {
            method: "post",
            body: formData,
         })

         const data = await res.json()

         setUploadedData(data)
         setIsLoading(false)
      } catch (err) {
         setError(err)
         setIsLoading(false)
      }
   }

   useEffect(() => {
      if (typeof imageFile !== "string") {
         uploadImage()
      }
   }, [imageFile])

   return { uploadedData, error, isLoading }
}
