import React from "react"

export default function ContentInput() {
   return (
      <>
         <Textarea />
      </>
   )
}

export const Textarea = () => {
   return (
      <>
         <div className="form-control">
            <label className="label">
               <span className="label-text">Article Content</span>
            </label>
            <textarea
               name="content"
               className="textarea textarea-bordered focus:textarea-primary  w-full"
               rows={5}
               required
            ></textarea>
         </div>
      </>
   )
}
