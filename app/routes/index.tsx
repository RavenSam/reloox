import Hero from "~/components/sections/Hero"
import DiscoverThree from "~/components/sections/DiscoverThree"
import StartSteps from "~/components/sections/StartSteps"

export default function Home(): JSX.Element {
   return (
      <>
         <section className="p-4 ">
            <Hero />
         </section>

         <section className="p-4 ">
            <StartSteps />
         </section>

         <section className="p-4 ">
            <DiscoverThree />
         </section>
      </>
   )
}
