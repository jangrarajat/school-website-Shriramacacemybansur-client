import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
    const [menu, setMenu] = useState(false)

    return (
        <nav className="navbar bg-white shadow-md sticky top-10 z-50 pt-5">
            <div className="  mx-auto px-4 py-2 flex justify-between  items-center">

                {/* Logo Section */}
                <Link to="/" className="flex items-center  gap-3 md:gap-1 group">
                    {/* Enlarged Logo Container */}
                    <div className="relative overflow-hidden">
                        <img
                            src={logo}
                            className="w-12 h-12 md:w-36 md:h-20 object-contain transition-transform duration-300"
                            alt="The Shriram Foundation School Logo"
                        />
                    </div>

                    {/* School Name in Capital Letters */}
                    <div className="flex flex-row items-center gap-2 justify-center py-2">
                        <h2 className="font-black text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase leading-none 
                             /* Coffee/Gold Gradient Styling */
                             bg-gradient-to-br from-[#4b3621] via-[#8b5a2b] to-[#6f4e37] 
                             bg-clip-text text-transparent 
                             /* Creative Shadow for depth */
                             drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] 
                             /* Font details */
                              font-[serif]">
                            The Shriram  <br  className="flex "/>Foundation  School
                        </h2>
                    </div>
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-2xl text-[#1e3a5f] focus:outline-none"
                    onClick={() => setMenu(!menu)}
                >
                    {menu ? <FaTimes /> : <FaBars />}
                </button>

                {/* Nav Links */}
                <div className={`
                    fixed md:static top-[130px] md:top-0 left-0 w-full md:w-auto 
                    bg-white md:bg-transparent flex flex-col md:flex-row 
                    items-center gap-4 md:gap-2 p-6 md:p-0 shadow-xl md:shadow-none
                    transition-all duration-300 ease-in-out
                    ${menu ? "translate-x-0" : "-translate-x-full md:translate-x-0"} uppercase  font-bold
                `}>
                    <Link to="/" onClick={() => setMenu(false)} className=" text-gray-700 hover:bg-blue-500  hover:text-white text-center p-2 rounded-xl w-full  transition ">Home</Link>
                    <Link to="/about" onClick={() => setMenu(false)} className=" text-gray-700 hover:bg-blue-500  hover:text-white text-center p-2 rounded-xl w-full  transition">About</Link>
                    <Link to="/admission" onClick={() => setMenu(false)} className=" text-gray-700 hover:bg-blue-500  hover:text-white text-center p-2 rounded-xl w-full  transition">Admission</Link>
                    <Link to="/talent" onClick={() => setMenu(false)} className="  text-gray-700 hover:bg-blue-500  hover:text-white text-center p-2 rounded-xl w-full  text-nowrap transition">Talentine exam 2026</Link>
                    <Link to="/gallery" onClick={() => setMenu(false)} className=" text-gray-700 hover:bg-blue-500  hover:text-white text-center p-2 rounded-xl w-full  transition">Gallery</Link>
                    <Link to="/contact" onClick={() => setMenu(false)} className=" text-gray-700 hover:bg-blue-500  hover:text-white text-center p-2 rounded-xl w-full  transition">Contact</Link>
                </div>

            </div>
        </nav>
    )
}