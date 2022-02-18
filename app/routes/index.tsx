import Hero from "~/components/sections/Hero"
import DiscoverThree from "~/components/sections/DiscoverThree"
import StartSteps from "~/components/sections/StartSteps"
import About from "~/components/sections/About"
import Newsletter from "~/components/sections/Newsletter"

export default function Home(): JSX.Element {
   return (
      <>
         <section className="p-4 ">
            <Hero />
         </section>

         <section className="p-4 mt-20">
            <StartSteps />
         </section>

         <section className="p-4 ">
            <DiscoverThree />
         </section>

         <section className="p-4 ">
            <About />
         </section>

         <section className="p-4 ">
            <Newsletter />
         </section>
      </>
   )
}
