import { Link } from "remix"
import { ArticlesTypes } from "types"
import truncate from "../../../utilts/truncate"

// const articles = [
//    {
//       id: 1,
//       title: "article one one one one one one one one one one one one one one one one ",
//       slug: "article-one",
//       description:
//          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit eveniet veritatis minima, expedita dolorum tenetur unde facilis.",
//       authorId: "john doe",
//       categories: "",
//       thumbnail: "https://api.lorem.space/image/movie?w=200&h=280",
//    },
//    {
//       id: 2,
//       title: "article two",
//       slug: "article-two",
//       description:
//          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit eveniet veritatis minima, expedita dolorum tenetur unde facilis.",
//       authorId: "john doe",
//       categories: "",
//       thumbnail: "https://api.lorem.space/image/movie?w=200&h=280",
//    },
//    {
//       id: 3,
//       title: "article Three",
//       slug: "article-three",
//       description:
//          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit eveniet veritatis minima, expedita dolorum tenetur unde facilis.",
//       authorId: "john doe",
//       categories: "",
//       thumbnail: "https://api.lorem.space/image/movie?w=200&h=280",
//    },
// ]

export default function DiscoverThree({ articles }): JSX.Element {
   return (
      <>
         <div className="w-full max-w-5xl mx-auto py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
               <div className="space-y-4 md:space-y-8 py-4 mb-10 text-center md:text-left max-w-md mx-auto md:mx-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl capitalize">
                     Discover our <span className="text-primary">popular</span> Articles & stories
                  </h2>

                  <p className=" text-gray-600">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga animi. Fugit eveniet
                     veritatis minima, expedita dolorum tenetur unde facilis.
                  </p>

                  <Link to="/articles" className="btn btn-primary">
                     see more stories
                  </Link>
               </div>

               <div className="space-y-4 w-full">
                  {articles.map((article) => (
                     <div key={article.id} className="mx-auto max-w-xl">
                        <div className="flex  h-[160px]">
                           <figure className="h-full  flex-none aspect-square overflow-hidden rounded-lg">
                              <img className="w-full h-full object-cover" src={article.thumbnail} alt={article.title} />
                           </figure>
                           <div className="px-4 h-full overflow-hidden">
                              <Link
                                 to={`/articles/${article.slug}`}
                                 title={article.title}
                                 className="font-bold md:text-lg lg:text-xl"
                              >
                                 {truncate(article.title)}
                              </Link>
                              <p className="text-xs sm:text-sm md:text-base text-gray-600 py-1">
                                 {truncate(article.description, 100)}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   )
}
