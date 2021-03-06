import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export function ContentEditor({ setContent, content }): JSX.Element {
   return (
      <>
         <CKEditor
            data={content}
            editor={ClassicEditor}
            onChange={(event, editor) => {
               const data = editor.getData()
               setContent(data)
            }}
         />
      </>
   )
}
