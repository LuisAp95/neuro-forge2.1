
//import { Button } from "@/components/ui/button"
import { Bot, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";



export default function Navbar() {
  return (
    
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between fixed px-6 py-4 backdrop-blur-sm border-b border-white/10 w-screen z-30 "
    >
      <Link to="/" className="flex items-center space-x-2">
        <Bot className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">Neuro Forgue</span>
      </Link>
      <div className="hidden md:flex items-center space-x-8 text-white">
        <Link to="/">Home</Link>
        <Link to="/about">Acerca</Link>
        <Link to="/services">Servicios</Link>
        <Link to="/">Contactos</Link>
      </div>
{



      <div className="hidden md:flex items-center space-x-4">
        <button  className="text-white hover:text-purple-400">
          Sign In
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</button>
      </div>
}

      <button className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </button>
    </motion.nav>
    
  )
}

{/*function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}
*/}