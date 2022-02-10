import { PropsWithChildren } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { BiImageAdd } from "react-icons/bi"
import { logInputsType } from "types"

interface propsInputTypes {
   input: logInputsType
   errors: any
   register: UseFormRegister<FieldValues>
}

export default function FormInputs(props: PropsWithChildren<propsInputTypes>): JSX.Element {
   switch (props.input.type) {
      case "text":
      case "password":
      case "email":
      case "search":
      case "number":
      case "url":
         return <TextInput {...props} />

      case "checkbox":
         return <FormCheckbox {...props} />

      case "file":
         return <FileInput {...props} />

      default:
         return <p>Not slected type form</p>
   }
}

export const TextInput = ({ input, register, errors }: PropsWithChildren<propsInputTypes>): JSX.Element => {
   return (
      <>
         <div className="form-control">
            <label className="label">
               <span className="label-text capitalize">{input.label}</span>
            </label>
            <input
               type={input.type}
               placeholder={input.placeholder}
               {...register(input.name)}
               className="input focus:input-primary input-bordered"
            />
            {errors[input.name] && (
               <label className="label">
                  <span className="label-text-alt text-pink-500">{errors[input.name]?.message}</span>
               </label>
            )}
         </div>
      </>
   )
}

export const FormCheckbox = ({ input, register }: PropsWithChildren<propsInputTypes>): JSX.Element => {
   return (
      <>
         <div className="form-control">
            <label className="cursor-pointer label !justify-start gap-2">
               <input {...register(input.name)} type="checkbox" className="checkbox checkbox-primary " />
               <span className="label-text">{input.label}</span>
            </label>
         </div>
      </>
   )
}

export const FileInput = ({ register, input }: PropsWithChildren<propsInputTypes>): JSX.Element => {
   return (
      <>
         <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
               <div className="flex flex-col items-center justify-center pt-7">
                  <BiImageAdd size={25} />
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select a photo</p>
               </div>
               <input {...register(input.name)} type="file" className="opacity-0" />
            </label>
         </div>
      </>
   )
}
