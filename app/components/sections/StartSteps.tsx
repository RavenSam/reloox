import { Link } from "remix"
import { BsBoxArrowInLeft, BsPen, BsPatchCheck } from "react-icons/bs"

const steps = [
   { label: "register", desc: "Create a RelooX account for free", icon: BsBoxArrowInLeft },
   { label: "write", desc: "Fellow the form and write your story", icon: BsPen },
   { label: "save", desc: "Save your story and let people read it", icon: BsPatchCheck },
]

export default function StartSteps() {
   return (
      <>
         <div className="w-full max-w-5xl mx-auto py-20 flex justify-center">
            <div className="w-full">
               <div className="text-center max-w-md mx-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl capitalize">
                     Start writing with <span className="text-primary">Three</span> easy steps
                  </h2>
               </div>

               <div className="flex justify-center md:block my-10">
                  <ul className="steps md:w-full  steps-vertical md:steps-horizontal">
                     {steps.map((step, i) => (
                        <li key={i} className="step ">
                           <StepCard step={step} />
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export const StepCard = ({ step }) => {
   return (
      <div className="w-48 shadow border rounded-lg p-3 text-center">
         <h3 className="capitalize">{step.label}</h3>
         <step.icon size={30} className="mx-auto text-primary my-4" />
         <p className="text-gray-700">{step.desc}</p>
      </div>
   )
}
