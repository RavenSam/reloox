import React from "react"
import { BiPlus } from "react-icons/bi"
import { Link } from "remix"
import ArticlesTable from "~/components/ArticlesTable"

export default function Articles() {
   return (
      <>
         <div className="flex items-center justify-between py-5">
            <h1>Articles</h1>

            <div className="">
               <Link to="/dashboard/articles/new-article" className="btn btn-outline btn-primary gap-2">
                  <BiPlus size={18} />
                  New Article
               </Link>
            </div>
         </div>

         <ArticlesTable />
      </>
   )
}
