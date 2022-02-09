import { PropsWithChildren } from "react"
import Navbar from "../Header"

export default function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
   return (
      <>
         <Navbar />

         <div className="mt-28">{children}</div>
      </>
   )
}
