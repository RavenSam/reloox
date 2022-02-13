import { ClientOnly } from "remix-utils"
import CkEditor from "./CkEditor.client"

export default function ContentInput({ setContent }): JSX.Element {
   return (
      <>
         <div className="form-control">
            <label className="label">
               <span className="label-text">Article Content</span>
            </label>
            <ClientOnly fallback={<Textarea />}>
               <CkEditor setContent={setContent} />
            </ClientOnly>
         </div>
      </>
   )
}

export const Textarea = () => {
   return (
      <>
         <textarea
            name="content"
            className="textarea textarea-bordered focus:textarea-primary  w-full"
            rows={5}
            required
         ></textarea>
      </>
   )
}
