import { differenceBy } from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import { HiX } from "react-icons/hi"

export default function AddCategories({ categories, selectedCategories, setSelectedCategories }): JSX.Element {
   const [catsToSelect, setCatsToSelect] = useState<any>([])

   useEffect(() => {
      const filteredCats = differenceBy(categories, selectedCategories, "id")

      setCatsToSelect(filteredCats)
   }, [selectedCategories])

   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const id = Number(e.target.value)
      const value = categories.find((cat) => cat.id === id)

      setSelectedCategories([...selectedCategories, value])
   }

   const removeCat = (id) => {
      const newcats = selectedCategories.filter((cat) => cat.id !== id)

      setSelectedCategories(newcats)
   }

   return (
      <div className="space-y-2">
         <select className="select w-full max-w-md select-primary" onChange={handleChange}>
            <option value="0">Select Category</option>

            {catsToSelect.map((cat) => (
               <option key={cat?.id} value={cat.id}>
                  {cat?.name}
               </option>
            ))}
         </select>

         <div className="w-full flex items-center flex-wrap">
            {selectedCategories.map((cat) => (
               <div
                  key={cat.id}
                  className="flex items-center gap-2 group text-sm capitalize border hover:border-primary hover:text-primary  rounded-full px-4 py-2 cursor-pointer m-1"
               >
                  <button className="" onClick={() => removeCat(cat.id)}>
                     <HiX size={15} />
                  </button>
                  {cat.name}
               </div>
            ))}
         </div>
      </div>
   )
}
