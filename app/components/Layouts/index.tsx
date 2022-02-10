import { PropsWithChildren } from "react"
import { useLocation } from "remix"
import Navbar from "../Header"

const noHeader: string[] = ["auth", "dashboard"]

export default function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
   const { pathname } = useLocation()
   const pathRoot = pathname.split("/").filter((x) => x !== "")[0]
   const hasNav = !noHeader.includes(pathRoot)

   return (
      <>
         {hasNav && <Navbar />}

         <div className={hasNav ? "mt-28" : ""}>{children}</div>
      </>
   )
}
