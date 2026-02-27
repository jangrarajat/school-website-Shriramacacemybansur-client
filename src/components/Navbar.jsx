import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
    const [menu, setMenu] = useState(false)

    return (
        <nav className="navbar bg-white shadow-md sticky top-10 z-50 pt-5">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 md:gap-4 group">
                    {/* Enlarged Logo Container */}
                    <div className="relative overflow-hidden">
                        <img
                            src={logo}
                            className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                            alt="The Shriram Foundation School Logo"
                        />
                    </div>

                    {/* School Name in Capital Letters */}
                    <div className="flex flex-col justify-center">
                        <h2 className="font-black text-sm md:text-xl lg:text-2xl tracking-tighter uppercase leading-none text-[#1e3a5f]">
                            The Shriram
                        </h2>
                        <h2 className="font-bold text-[10px] md:text-sm lg:text-base tracking-[0.15em] uppercase leading-tight text-orange-600">
                            Foundation School
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
                    fixed md:static top-[110px] md:top-0 left-0 w-full md:w-auto 
                    bg-white md:bg-transparent flex flex-col md:flex-row 
                    items-center gap-4 md:gap-6 p-6 md:p-0 shadow-xl md:shadow-none
                    transition-all duration-300 ease-in-out
                    ${menu ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}>
                    <Link to="/" onClick={() => setMenu(false)} className="font-semibold text-gray-700 hover:text-blue-600 transition">Home</Link>
                    <Link to="/about" onClick={() => setMenu(false)} className="font-semibold text-gray-700 hover:text-blue-600 transition">About</Link>
                    <Link to="/admission" onClick={() => setMenu(false)} className="font-semibold text-gray-700 hover:text-blue-600 transition">Admission</Link>
                    <Link to="/talent" onClick={() => setMenu(false)} className="font-semibold text-gray-700 hover:text-blue-600 transition text-center">Talentine exam</Link>
                    <Link to="/gallery" onClick={() => setMenu(false)} className="font-semibold text-gray-700 hover:text-blue-600 transition">Gallery</Link>
                    <Link to="/contact" onClick={() => setMenu(false)} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">Contact</Link>
                </div>

            </div>
        </nav>
    )
}