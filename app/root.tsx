import { Links, LiveReload, LoaderFunction, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "remix"
import type { MetaFunction, LinksFunction, ErrorBoundaryComponent } from "remix"
import styles from "./tailwind.css"
import { PropsWithChildren } from "react"
import Layout from "./components/Layouts"
import { getUser } from "./lib/session.server"

export const loader: LoaderFunction = async ({ request }) => {
   const user = await getUser(request)

   return { user }
}

export const links: LinksFunction = () => {
   return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => {
   return { title: "New Remix App" }
}

export default function App(): JSX.Element {
   const loaderData = useLoaderData()

   return (
      <>
         <Document>
            <Layout user={loaderData?.user}>
               <Outlet />
            </Layout>
         </Document>
      </>
   )
}

export const Document = ({ children }: PropsWithChildren<{}>): JSX.Element => {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
               href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
               rel="stylesheet"
            />
            <Meta />
            <Links />
         </head>
         <body>
            {children}

            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === "development" && <LiveReload />}
         </body>
      </html>
   )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
   console.log(error)

   return (
      <Document>
         <div>
            <h1 className="py-4">Error</h1>
            <p className="">{error.message}</p>
         </div>
      </Document>
   )
}
