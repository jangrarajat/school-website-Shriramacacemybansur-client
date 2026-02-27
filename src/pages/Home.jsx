import { useState, useEffect } from "react";

import img1 from "../assets/school1.jpeg";
import img2 from "../assets/school2.jpeg";
import img3 from "../assets/school3.jpeg";
import img4 from "../assets/school4.jpeg";
import img5 from "../assets/school5.jpeg";
import img6 from "../assets/school6.jpeg";
import img7 from "../assets/school7.jpeg";
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {

    const images = [
        img1, img2, img3, img4, img5, img6, img7
    ];

    const [index, setIndex] = useState(0);


    /* Auto Slide */

    useEffect(() => {

        const timer = setInterval(() => {

            setIndex((prev) => (prev + 1) % images.length)

        }, 5000)

        return () => clearInterval(timer)

    }, [])



    /* Next Slide */

    const nextSlide = () => {

        setIndex((index + 1) % images.length)

    }


    /* Previous Slide */

    const prevSlide = () => {

        setIndex((index - 1 + images.length) % images.length)

    }



    return (


        <>
            <Navbar />
            <div>


                <div className="relative w-full overflow-hidden bg-gray-900 group">
                    {/* Image Container with Fixed Height */}
                    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
                        <img
                            src={images[index]}
                            alt="School Slide"
                            className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                        />
                        {/* Dark Overlay for better text contrast */}
                        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                    </div>

                    {/* Hero Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

                        {/* Badge / Small Title */}
                        <span className="mb-4 px-4 py-1 bg-yellow-400 text-black text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-full shadow-lg animate-bounce">
                            Welcome to Excellence
                        </span>

                        {/* Main Title */}
                        <h1 className="w-full max-w-5xl text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-tight text-white drop-shadow-2xl">
                            The Shriram <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                                Foundation School
                            </span>
                        </h1>

                        {/* Subtitle / Slogan */}
                        <p className="mt-4 max-w-2xl text-white/90 text-sm md:text-xl font-medium tracking-wide italic">
                            "Quality Education For A Bright & Successful Future"
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 md:mt-12 flex flex-row items-center justify-center gap-4 w-full">
                            <Link
                                to="/contact"
                                className="px-6 py-3 md:px-10 md:py-4 rounded-full border-2 border-white text-white font-bold uppercase text-[10px] md:text-sm hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                            >
                                Contact Us
                            </Link>

                            <Link
                                to="/admission"
                                className="relative overflow-hidden px-6 py-3 md:px-10 md:py-4 rounded-full bg-orange-600 text-white font-bold uppercase text-[10px] md:text-sm shadow-xl hover:bg-orange-500 transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                Admission Open
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Arrows - Only visible on hover */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                        ❯
                    </button>

                    {/* Elegant Dots Navigation */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`transition-all duration-300 rounded-full ${index === i ? "w-8 h-2 bg-yellow-400" : "w-2 h-2 bg-white/50 hover:bg-white"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* ABOUT SECTION */}

                <div className="aboutContainer">

                    <h1 className="aboutTitle">

                        About Our School

                    </h1>


                    <div className="aboutFlex">


                        {/* Left Image */}

                        <div className="aboutImageBox">

                            <img
                                src={images[0]}
                                className="aboutImage"
                            />

                        </div>


                        {/* Right Text */}

                        <div className="aboutText">

                            <h2>

                                Excellence Through Innovation

                            </h2>

                            <p className=" font-thin ">

                                The Shriram Foundation School has been a beacon of
                                educational excellence committed to nurturing
                                young minds and fostering a love for learning.

                            </p>

                            <p className=" font-thin ">

                                With modern facilities and experienced teachers,
                                we ensure every student reaches their full potential.

                            </p>



                            {/* Mission Vision */}

                            <div className="missionVision">


                                <div className="missionBox">

                                    <h3>

                                        • Our Mission

                                    </h3>

                                    <p className=" font-thin ">

                                        To provide quality education and develop
                                        creativity and character in students.

                                    </p>

                                </div>


                                <div className="visionBox">

                                    <h3>

                                        • Our Vision

                                    </h3>

                                    <p className=" font-thin ">

                                        To become a leading school providing
                                        modern education and strong values.

                                    </p>

                                </div>


                            </div>


                        </div>


                    </div>

                </div>

                {/* PRINCIPAL MESSAGE  */}

                <div className="principalSection">


                    <div className="principalFlex">


                        {/* Image */}

                        <div className="principalImageBox">

                            <img
                                src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772189649/WhatsApp_Image_2026-02-27_at_4.19.43_PM_fkrafv.jpg"
                                className="principalImage"
                            />

                        </div>



                        {/* Text */}

                        <div className="principalText">
                            <h1 className="text-4xl text-orange-600">Kuldeep Choudhary <span className=" text-white">||</span> <span className=" text-2xl text-yellow-500">Managing Director</span></h1>

                            <h2>

                               Managing Director Massage 

                            </h2>


                            <p className=" font-thin">

                                Welcome to The Shriram Foundation School family!
                                We believe education is not only about academic
                                achievement but overall development of students.

                                Our teachers work hard to create an environment
                                where learning is joyful and students succeed.

                            </p>


                            <h3>

                                Principal

                            </h3>


                        </div>


                    </div>


                </div>

                {/* FACULTY SECTION */}

                <div className="facultySection">

                    <h1 className="facultyTitle">

                        Our Dedicated Faculty

                    </h1>

                    <p className="facultySubtitle">

                        Our experienced and passionate teachers are committed
                        to providing excellent education and guidance.

                    </p>


                    <div className="facultyGrid">


                        {/* Teacher 1 */}

                        <div className="facultyCard">



                            <div className="facultyInfo">

                                <h3>Dharampal Kumhar </h3>

                                <p className="subject">

                                    Principal

                                </p>



                                <button className="learnBtn">

                                    Learn More

                                </button>

                            </div>

                        </div>



                    



                        {/* Teacher 3 */}

                        <div className="facultyCard">



                            <div className="facultyInfo">

                                <h3>Ankesh Choudhary </h3>

                                <p className="subject">

                                    Preschool Coordinator

                                </p>

                                <p className="qualification">

                                    ✔ Qualification: M.Sc Physics, B.Ed

                                </p>

                                <button className="learnBtn">

                                    Learn More

                                </button>

                            </div>

                        </div>


                    </div>

                </div>

            \



                {/* FOOTER */}

              <Footer/>
            </div>
        </>

    )

}

