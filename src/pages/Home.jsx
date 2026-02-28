import { useState, useEffect } from "react";

import img1 from "../assets/school1.jpeg";
import img2 from "../assets/school2.jpeg";
import img3 from "../assets/school3.jpeg";
import img4 from "../assets/school4.jpeg";
import img5 from "../assets/school5.jpeg";
import img6 from "../assets/school6.jpeg";
import img7 from "../assets/school7.jpeg";
import img8 from "../assets/school8.jpeg";
import slide1 from "../assets/slide1.jpeg"
import slide2 from "../assets/slide2.jpeg"
import slide3 from "../assets/slide3.jpeg"
import slide4 from "../assets/slide4.jpeg"

import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {

    const images = [
        img1, img2, img3, img4, img5, img6, img7, img8
    ];
    const slideImage = [
        slide1 , slide2 , slide3 , slide4
    ]

    const [index, setIndex] = useState(0);


    /* Auto Slide */

    useEffect(() => {

        const timer = setInterval(() => {

            setIndex((prev) => (prev + 1) % slideImage.length)

        }, 5000)

        return () => clearInterval(timer)

    }, [])



    /* Next Slide */

    const nextSlide = () => {

        setIndex((index + 1) % slideImage.length)

    }


    /* Previous Slide */

    const prevSlide = () => {

        setIndex((index - 1 + images.length) % slideImage.length)

    }



    return (


        <>
            <Navbar />
            <div>


                <div className="relative w-full overflow-hidden bg-gray-900 group">
                    {/* Image Container with Fixed Height */}
                    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
                        <img
                            src={slideImage[index]}
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
                        {slideImage.map((_, i) => (
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

                    <h1 className="aboutTitle uppercase font-bold">

                        About Our School

                    </h1>


                    <div className="aboutFlex">


                        {/* Left Image */}

                        <div className="aboutImageBox  h-full bg-red-500">


                            <img
                                src={images[4]}
                                className=" w-full h-full"
                            />
                            <img
                                src={images[1]}
                                className=" w-full h-full"
                            />
                            <img
                                src={images[5]}
                                className=" w-full h-full"
                            />
                            <img
                                src={images[3]}
                                className=" w-full h-full"
                            />

                        </div>


                        {/* Right Text */}

                        <div className="aboutText">

                            <h2 className=" uppercase">

                                Excellence Through Innovation

                            </h2>

                            <div className=" font-sans ">

                                <p>
                                    The Shriram Foundation School
                                    The Shriram Foundation School is a well-known and trusted school that provides quality education from Pre-Primary to Class 10th. We focus on building a strong academic foundation while also teaching discipline, good values, and confidence.
                                    Our aim is not only to help students score good marks but also to help them grow into responsible, confident, and successful individuals.
                                    We provide special preparation for important entrance exams like Navodaya Vidyalaya, Sainik School, Military School, and RIMC. With the support of experienced teachers, regular tests, proper study material, and personal guidance, we help students achieve their goals.
                                </p>
                                <br className=" mt-5" />    <span className=" text-blue-600 text-2xl mt-5 ">    Why Choose Us?</span>
                                <ul className="text-sm mt-3 ">
                                    <li> ✔ English & Hindi Medium School</li>
                                    <li> ✔ Classes from Pre-Primary to 10th</li>
                                    <li> ✔ Special Foundation Classes</li>
                                    <li> ✔ Continuous Performance Monitoring</li>
                                    <li>✔ Residential Facility for Boys & Girls</li>
                                    <li> ✔ Residential Facility for Boys & Girls</li>
                                    <li>✔ Safe, Disciplined & Student-Friendly Campus</li>
                                    <li>✔ Focus on Academic Excellence & Character Development</li>
                                    <li>✔Activity-Based Learning</li>
                                    <li>✔ English & Hindi Communication Practice</li>
                                    <li> ✔ Development of Social & Moral Values</li>
                                    <li>✔ Focus on Confidence & Creativity</li>
                                    <li>✔ Personal Care & Attention</li>
                                </ul>



                                <p className=" mt-4">
                                    At The Shriram Foundation School, we believe every child has talent and potential. With the right guidance, care, and learning environment, we help students build a bright and successful future.
                                </p>
                            </div>

                            <p className=" font-sans ">

                                With modern facilities and experienced teachers,
                                we ensure every student reaches their full potential.

                            </p>



                            {/* Mission Vision */}

                            <div className="missionVision">


                                <div className="shadow-black/25  rounded-3xl shadow-lg hover:scale-105 duration-300  missionBox ">

                                    <h3>

                                        • Our Mission

                                    </h3>

                                    <p className=" font-san ">

                                        To provide quality education and develop
                                        creativity and character in students.

                                    </p>

                                </div>


                                <div className="shadow-black/25  rounded-3xl shadow-lg hover:scale-105 duration-300  visionBox">

                                    <h3>

                                        • Our Vision

                                    </h3>

                                    <p className=" font-sans">

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
                                src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772257447/WhatsApp_Image_2026-02-28_at_11.11.51_AM_nh8vmu.jpg"
                                className="principalImage"
                            />

                        </div>



                        {/* Text */}

                        <div className="principalText">
                            <h1 className=" text-2xl md:text-4xl font-bold uppercase ">Dharampal Kumhar <br /> <span className=" text-2xl  font-bold text-blue-300  ">Principal </span></h1>

                            <p className="  font-sans font-light  text-gray-300">

                                At <span className=" uppercase"> The SHRIRAM FOUNDATION School</span>, we are committed to providing quality education from Pre-Primary to 10th Class with strong academic foundations, discipline, and moral values.
                                Along with regular studies, we provide special coaching and guidance for prestigious entrance exams like JNVST, AISSEE, RMS, and RIMC. Our experienced teachers focus on clear concepts, personality development, and overall growth of every child.
                                Dear Students, believe in yourself, stay disciplined, respect your teachers and parents, and never stop learning. Hard work, honesty, and dedication are the keys to success.
                                With the strong support of parents, we aim to shape confident, disciplined, and successful future leaders.
                                <br />  Principal
                                <br />
                                <span className=" uppercase">The SHRIRAM FOUNDATION School</span>
                            </p>


                            {/* The SHRIRAM FOUNDATION School */}


                        </div>


                    </div>


                </div>

                {/* FACULTY SECTION */}

                <div className="facultySection">

                    <h1 className="facultyTitle uppercase font-bold">

                        Our Team

                    </h1>

                    <p className="facultySubtitle">

                        Our experienced and passionate teachers are committed
                        to providing excellent education and guidance.

                    </p>


                    <div className="facultyGrid ">




                        {/* Teacher 3 */}

                        <div className=" shadow-black/25  rounded-3xl shadow-lg hover:scale-105 duration-300   ">

                            <div className="facultyInfo  uppercase ">

                                <h3 className="text-2xl font-extrabold">Koushal Dahiya</h3>

                                <p className="subject  ">
                                    DIRECTOR
                                </p>
                                <div className=" rounded-full h-40 w-40  m-auto mb-4 border-[5px] border-yellow-500">
                                    <img
                                        src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772264983/WhatsApp_Image_2026-02-28_at_1.08.38_PM_mxffbc.jpg"
                                        alt=""
                                        className=" w-full rounded-full  h-full  mb-6"

                                    />
                                </div>
                                <div className="border border-b-gray-500"></div>
                                <p className=" font-sans text-gray-600 text-sm lowercase ">
                                    Welcome to The Shriram Foundation School. We provide quality education in a safe environment, helping students build knowledge, discipline, confidence, and values to become responsible and successful individuals in life.
                                </p>
                            </div>
                        </div>

                        {/* Teacher 1 */}

                        <div className=" shadow-black/25  rounded-3xl shadow-lg hover:scale-105 duration-300 ">

                            <div className="facultyInfo  ">

                                <h3 className=" uppercase text-2xl font-extrabold">Kuldeep Choudhary </h3>

                                <p className="subject uppercase ">

                                    Managing Director

                                </p>
                                <div className=" rounded-full h-40 w-40  m-auto mb-4 border-[5px] border-yellow-500">
                                    <img
                                        src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193086/WhatsApp_Image_2026-02-27_at_4.19.43_PM_erymcv.jpg"
                                        alt=""
                                        className=" w-full rounded-full  h-full  mb-6"

                                    />
                                </div>
                                <div className="border border-b-gray-500"></div>

                                <p className=" font-sans text-gray-600 text-sm   lowercase">

                                    At The Shriram Foundation School, we guide students with strong academics, discipline, and values, including preparation for Navodaya, Sainik, Military School, and RIMC, helping students achieve success through dedication and confidence.
                                </p>



                            </div>

                        </div>



                        <div className=" shadow-black/25  rounded-3xl shadow-lg hover:scale-105 duration-300  ">
                            <div className="facultyInfo  uppercase ">
                                <h3 className="text-2xl font-extrabold">Ankesh Choudhary </h3>
                                <p className="subject ">
                                    Preschool Coordinator
                                </p>
                                <div className=" rounded-full h-40 w-40  m-auto mb-4 border-[5px] border-yellow-500 ">
                                    <img
                                        src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772265677/WhatsApp_Image_2026-02-28_at_1.29.46_PM_fqlc72.jpg"
                                        alt=""
                                        className=" w-full rounded-full  h-full  mb-6  "

                                    />
                                </div>
                                <div className="border border-b-gray-500"></div>
                                <p className=" font-sans text-sm text-gray-600  lowercase">
                                    Pre-Primary Wing (LKG to Class 3):
                                    <br />  At The Shriram Foundation School, our Pre-Primary Wing builds strong basic skills through fun learning in a safe environment, helping children grow with confidence, discipline, and good values.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>





                {/* FOOTER */}

                <Footer />
            </div>
        </>

    )

}

