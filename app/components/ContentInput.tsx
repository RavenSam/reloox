import { ClientOnly } from "remix-utils"
import { ContentEditor } from "./ContentEditor.client"

export default function ContentInput({ setContent, content }): JSX.Element {
   return (
      <>
         <div className="form-control">
            <label className="label">
               <span className="label-text">Article Content</span>
            </label>
            <ClientOnly fallback={<Textarea />}>
               <ContentEditor content={content} setContent={setContent} />
            </ClientOnly>
         </div>
      </>
   )
}

const Textarea = (): JSX.Element => {
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
