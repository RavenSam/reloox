import Hero from "~/components/sections/Hero"
import DiscoverThree from "~/components/sections/DiscoverThree"
import StartSteps from "~/components/sections/StartSteps"
import About from "~/components/sections/About"
import Newsletter from "~/components/sections/Newsletter"
import { LoaderFunction, MetaFunction, useLoaderData } from "remix"
import { db } from "~/lib/db.server"

export const loader: LoaderFunction = async ({ params }) => {
   const articles = await db.post.findMany({
      take: 3,
      select: {
         id: true,
         title: true,
         slug: true,
         createdAt: true,
         description: true,
         thumbnail: true,
      },
      orderBy: { createdAt: "desc" },
   })

   return { articles }
}

export default function Home(): JSX.Element {
   const { articles } = useLoaderData()

   return (
      <>
         <section className="p-4 ">
            <Hero />
         </section>

         <section className="p-4 mt-20">
            <StartSteps />
         </section>

         <section className="p-4 ">
            <DiscoverThree articles={articles} />
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

export const meta: MetaFunction = () => {
   const title = "Home | ReblooX"
   const description = `Rebloox write and read | Find the best stories, articles and post. And have fun time writing your onw stories for other people to enjoy.`

   return { title, description }
}
