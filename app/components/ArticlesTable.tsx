import { BiPencil, BiTrash } from "react-icons/bi"
import { Link } from "remix"

const dummyArticles = [
   { title: "Article one", created: "24 dec 2021", category: "finance", img: "" },
   { title: "Article Two", created: "24 dec 2021", category: "adventures", img: "" },
   { title: "Article Three", created: "24 dec 2021", category: "food", img: "" },
]

export default function ArticlesTable() {
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
                                    <div className="font-semibold text-left">featured image</div>
                                 </th>
                                 <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">created at</div>
                                 </th>
                                 <th className="p-2 whitespace-nowrap"></th>
                              </tr>
                           </thead>
                           <tbody className="text-sm divide-y divide-gray-100">
                              {dummyArticles.map((el, i) => (
                                 <tr key={i}>
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
                                             to={`/dashboard/articles/edit/${i}`}
                                             className="font-medium text-gray-800 max-w-[15ch] truncate"
                                          >
                                             {el.title}
                                          </Link>
                                       </div>
                                    </td>

                                    <td className="p-2 whitespace-nowrap">
                                       <div className="text-left font-medium">{el.category}</div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                       <div className="text-left w-12 h-12 rounded-full overflow-hidden">
                                          <img src="/user.jpg" alt="" width={50} height={50} />
                                       </div>
                                    </td>

                                    <td className="p-2 whitespace-nowrap">
                                       <div className="text-left font-medium">{el.created}</div>
                                    </td>

                                    <td className="p-2 text-right whitespace-nowrap space-x-2">
                                       <button className="btn btn-circle btn-error btn-outline btn-sm">
                                          <BiTrash size={18} />
                                       </button>

                                       <button className="btn btn-circle btn-accent btn-outline btn-sm">
                                          <BiPencil size={18} />
                                       </button>
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
