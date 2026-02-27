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
       <Navbar/>
        <div>

           
            <div className="slider">


                {/* Image */}

                <img

                    src={images[index]}

                    className="slideImage"

                />



                {/* Left Text */}

                <div className="heroText">

                    <h1>

                        The Shriram Foundation School

                    </h1>

                    <p>

                        Quality Education For Bright Future

                    </p>


                    <div className="heroButtons">

                        <button className="contactBtn">

                            Contact Us

                        </button>


                        <button className="admissionBtn">

                            Admission Open

                        </button>

                    </div>


                </div>



                {/* Arrows */}

                <div className="arrow left"

                    onClick={prevSlide}

                >

                    ❮

                </div>


                <div className="arrow right"

                    onClick={nextSlide}

                >

                    ❯

                </div>



                {/* Dots */}

                <div className="dots">

                    {

                        images.map((_, i) => (

                            <span

                                key={i}

                                className={index === i ? "dot active" : "dot"}

                                onClick={() => setIndex(i)}

                            ></span>

                        ))

                    }

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

                                <p  className=" font-thin ">

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
                            src="/src/assets/principal.jpeg"
                            className="principalImage"
                        />

                    </div>



                    {/* Text */}

                    <div className="principalText">

                        <h2>

                            Principal's Message

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

                            <h3>Priya Sharma</h3>

                            <p className="subject">

                                English Literature

                            </p>

                            <p className="qualification">

                                ✔ Qualification: M.A English, B.Ed

                            </p>

                            <button className="learnBtn">

                                Learn More

                            </button>

                        </div>

                    </div>



                    {/* Teacher 2 */}

                    <div className="facultyCard">

                       

                        <div className="facultyInfo">

                            <h3>Amit Patel</h3>

                            <p className="subject">

                                Mathematics

                            </p>

                            <p className="qualification">

                                ✔ Qualification: M.Sc Maths, B.Ed

                            </p>

                            <button className="learnBtn">

                                Learn More

                            </button>

                        </div>

                    </div>



                    {/* Teacher 3 */}

                    <div className="facultyCard">

                      

                        <div className="facultyInfo">

                            <h3>Neha Singh</h3>

                            <p className="subject">

                                Science

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

            {/* JOIN SCHOOL SECTION */}

            <div className="joinSection">

                <h1>

                    Ready to Join Our School?

                </h1>

                <p className=" font-thin">

                    Take the first step towards a bright future.
                    Explore our admission process and become
                    part of our school family today.

                </p>

                <div className="joinButtons">

                    <button className="applyBtn  text-blue-600">

                        Apply Now

                    </button>

                    <button className="contactBtn">

                        Contact Us

                    </button>

                </div>

            </div>



            {/* FOOTER */}

            <div className="footer">


                <div className="footerContainer">


                    {/* School */}

                    <div className="footerBox">

                        <h3>

                            Our School

                        </h3>

                        <p>

                            Excellence in Education - Building bright
                            futures for students.

                        </p>

                    </div>



                    {/* Links */}

                    <div className="footerBox">

                        <h3>

                            Quick Links

                        </h3>

                        <p>Home</p>
                        <p>Admission</p>
                        <p>Gallery</p>
                        <p>Contact</p>

                    </div>



                    {/* Contact */}

                    <div className="footerBox">

                        <h3>

                            Contact Us

                        </h3>

                        <p className="   flex items-center gap-2">

                           <FaPhoneAlt/>  7733902183

                        </p>

                        <p className="   flex items-center gap-2">

                         <FaEnvelope/>   Shriramacacemybansur@gmail.com

                        </p>

                        <p className="   flex items-center gap-2">

                            <FaMapMarkerAlt/> Shubhash Chowk, Kotputli Road,
                            Bansur Rajasthan

                        </p>

                    </div>



                    {/* Social */}

                    <div className="footerBox">

                        <h3>

                            Follow Us

                        </h3>

                        <div className="icons">

                            <a href="https://www.facebook.com/share/1FqqMpuE7m/">

                                <FaFacebookF/>

                            </a>

                            <a href="https://www.instagram.com/shriramacademybansur?igsh=Z3FrcjNmM2k1dXA5">

                                <FaInstagram/>

                            </a>

                            <a href="https://youtube.com/@shriramacademybansur?si=DBOnHFWKPU5QqQux">

                                <FaYoutube/>

                            </a>



                        </div>

                    </div>


                </div>



                <div className="copyright">

                    © 2026 The Shriram Foundation School

                </div>


            </div>
        </div>
      </>

    )

}

