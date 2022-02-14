import { json } from "remix"

export default (fields) => {
   const { title, content, thumbnail, description, slug } = fields

   if (typeof title !== "string" || title.length > 5) {
      return json({ fieldErrors: { title: "Title is requiered to be at least 5 characters" }, fields })
   }

   if (typeof slug !== "string" || !slug) {
      return json({ fieldErrors: { slug: "Slug is requiered and unique" }, fields })
   }

   if (typeof description !== "string" || description.length > 5) {
      return json({ fieldErrors: { description: "Description is requiered to be at least 5 characters" }, fields })
   }

   if (typeof thumbnail !== "string" || !thumbnail) {
      return json({ fieldErrors: { thumbnail: "your post need a thumbnail" }, fields })
   }

   if (typeof content !== "string" || content.length > 5) {
      return json({ fieldErrors: { content: "content is requiered to be at least 5 characters" }, fields })
   }
}
