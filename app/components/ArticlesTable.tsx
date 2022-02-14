import { PropsWithChildren } from "react"
import { BiPencil, BiTrash } from "react-icons/bi"
import { Link } from "remix"
import { TableArticlesTypes } from "types"

interface ArticlesTableProps {
   articles: TableArticlesTypes[]
}

export default function ArticlesTable({ articles }: PropsWithChildren<ArticlesTableProps>): JSX.Element {
   return (
      <>
         <section className="my-10 text-gray-600">
            <div className="flex flex-col justify-center h-full">
               <div className="w-full bg-white shadow border border-gray-200 rounded-xl">
                  <div className="p-3">
                     <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                           <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                              <tr>
                                 <th className="whitespace-nowrap"></th>
                                 <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">title</div>
                                 </th>

                                 <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">category</div>
                                 </th>
                                 <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">description</div>
                                 </th>
                                 <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">created</div>
                                 </th>

                                 <th className="p-2 whitespace-nowrap"></th>
                              </tr>
                           </thead>
                           <tbody className="text-sm divide-y divide-gray-100">
                              {articles.map((el) => (
                                 <tr key={el.id}>
                                    <td>
                                       <div className="card bordered ">
                                          <div className="form-control">
                                             <label className="cursor-pointer label">
                                                <input type="checkbox" className="checkbox checkbox-primary" />
                                             </label>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                       <div className="flex items-center">
                                          <Link
                                             title={el.title}
                                             to={`/dashboard/articles/edit/${el.slug}`}
                                             className="font-medium text-gray-800 max-w-[15ch] truncate"
                                          >
                                             {el.title}
                                          </Link>
                                       </div>
                                    </td>

                                    <td className="p-2 whitespace-nowrap">
                                       <div className="text-left font-medium text-gray-600 max-w-[20ch] truncate">
                                          {el.categories.map((cat, i) => (
                                             <span key={cat.id}>
                                                {cat.name}
                                                {", "}
                                             </span>
                                          ))}
                                       </div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                       <div
                                          title={el.description}
                                          className="text-left text-gray-600 max-w-[25ch] truncate"
                                       >
                                          {el.description}
                                       </div>
                                    </td>

                                    <td className="p-2 whitespace-nowrap">
                                       <div className="text-left font-medium text-sm tracking-wide text-gray-600">
                                          {new Date(el.createdAt).toLocaleDateString()}
                                       </div>
                                    </td>

                                    <td className="p-2 text-right whitespace-nowrap flex items-center justify-end">
                                       <form action={`/dashboard/articles/delete?post=${el.id}`} method="post">
                                          <button type="submit" className="btn btn-ghost btn-sm">
                                             <BiTrash size={18} />
                                          </button>
                                       </form>

                                       <Link
                                          to={`/dashboard/articles/edit/${el.slug}`}
                                          className="btn btn-ghost btn-sm"
                                       >
                                          <BiPencil size={18} />
                                       </Link>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
