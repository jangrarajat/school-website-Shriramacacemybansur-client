import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Navbar() {

    const [menu, setMenu] = useState(false)

    return (

        <div className="navbar">

            <div className="container navflex">

                {/* Logo */}

                <div className="logoBox">

                    <img src={logo} className="logo" />

                    <div className="schoolName">

                        The Shriram Foundation School

                    </div>

                </div>


                {/* Desktop Menu */}

                <div className="menu uppercase">

                    <Link to="/">Home</Link>

                    <Link to="/about">About</Link>

                    <Link to="/admission">Admission</Link>

                    {/* <Link to="/exam">Exam</Link> */}

                    <Link to="/talent">Talentine Exam</Link>

                    <Link to="/gallery">Gallery</Link>

                    <Link to="/contact">Contact</Link>


                    <Link to="/admin">

                        {/* <button className="btn">

Admin

</button> */}

                    </Link>

                </div>



            </div>

        </div>

    )

}