import { User } from "@prisma/client"
import { PropsWithChildren } from "react"
import { useLocation } from "remix"
import Footer from "../Footer"
import Navbar from "../Header"

const noHeader: string[] = ["auth", "dashboard"]

export default function Layout({ children, user }: PropsWithChildren<{ user: User | null }>): JSX.Element {
   const { pathname } = useLocation()
   const pathRoot = pathname.split("/").filter((x) => x !== "")[0]
   const hasNav = !noHeader.includes(pathRoot)

   return (
      <>
         {hasNav && <Navbar user={user} />}

         <div className={hasNav ? "mt-28" : ""}>{children}</div>

         {hasNav && <Footer />}
      </>
   )
}
