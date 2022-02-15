import { AiOutlineHistory, AiOutlineDashboard, AiOutlineAreaChart } from "react-icons/ai"

const statsInfo = [
   { title: "Downloads", value: "31K", desc: "Jan 1st - Feb 1st", icon: AiOutlineHistory },
   { title: "New Users", value: "4,200", desc: "↗︎ 400 (22%)", icon: AiOutlineDashboard },
   { title: "New Registers", value: "1,200", desc: "↘︎ 90 (14%)", icon: AiOutlineAreaChart },
]

export default function UserStats() {
   return (
      <>
         <div className="shadow stats w-full">
            {statsInfo.map((el, i) => (
               <div key={i} className="stat">
                  <div className="stat-figure text-secondary lg:pr-5">
                     <el.icon size={30} />
                  </div>
                  <div className="stat-title">{el.title}</div>
                  <div className="stat-value py-4">{el.value}</div>
                  <div className="stat-desc">{el.desc}</div>
               </div>
            ))}
         </div>
      </>
   )
}
