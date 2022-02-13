import { Link } from "remix"
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaBlogger, FaBloggerB, FaYoutube } from "react-icons/fa"

const servicesLink = [
   { name: "Articles", href: "/articles" },
   { name: "Design", href: "#" },
   { name: "Marketing", href: "#" },
   { name: "Advertisement", href: "#" },
]

const companyLink = [
   { name: "About us", href: "#" },
   { name: "Contact", href: "#" },
   { name: "Jobs", href: "#" },
   { name: "Advertisement", href: "#" },
]

const legalLink = [
   { name: "Terms of use", href: "#" },
   { name: "Privacy policy", href: "#" },
   { name: "Cookie policy", href: "#" },
]

export default function Footer() {
   return (
      <>
         <footer className="p-10 footer bg-base-200 text-base-content mt-32 lg:px-0 max-w-6xl mx-auto">
            <div>
               <span className="footer-title">Services</span>
               {servicesLink.map((el, i) => (
                  <a href={el.href}>{el.name}</a>
               ))}
            </div>
            <div>
               <span className="footer-title">Company</span>
               {companyLink.map((el, i) => (
                  <a href={el.href}>{el.name}</a>
               ))}
            </div>
            <div>
               <span className="footer-title">Legal</span>
               {legalLink.map((el, i) => (
                  <a href={el.href}>{el.name}</a>
               ))}
            </div>
         </footer>
         <footer className="px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300">
            <div className="items-center grid-flow-col">
               <Link to="/" className="text-xl font-extrabold">
                  ReLoo<span className="text-primary text-2xl">X</span>
               </Link>
            </div>
            <div className="md:place-self-center md:justify-self-end">
               <div className="grid grid-flow-col gap-4 lg:gap-8">
                  <a href="#">
                     <FaFacebookF size={25} />
                  </a>
                  <a href="#">
                     <FaTwitter size={25} />
                  </a>

                  <a href="#">
                     <FaYoutube size={25} />
                  </a>

                  <a href="#">
                     <FaLinkedinIn size={25} />
                  </a>

                  <a href="#">
                     <FaBloggerB size={25} />
                  </a>
               </div>
            </div>
         </footer>
      </>
   )
}
