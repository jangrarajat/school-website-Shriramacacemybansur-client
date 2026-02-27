import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Footer() {

    return (

        <div>


            {/* JOIN SECTION */}

            <div className="joinSection">

                <h1>

                    Ready to Join Our School?

                </h1>

                <p>

                    Take the first step towards a bright future.
                    Explore our admission process and become
                    part of our school family today.

                </p>

                <div className="joinButtons">

                    <Link to="/admission">

                        <button className="applyBtn">

                            Apply Now

                        </button>

                    </Link>


                    <Link to="/contact">

                        <button className="contactBtn">

                            Contact Us

                        </button>

                    </Link>

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
                            futures for students since 2010.

                        </p>

                    </div>



                    {/* Links */}

                    <div className="footerBox">

                        <h3>

                            Quick Links

                        </h3>

                        <Link to="/">Home</Link>
                        <br />

                        <Link to="/admission">Admission</Link>
                        <br />

                        <Link to="/gallery">Gallery</Link>
                        <br />

                        <Link to="/contact">Contact</Link>

                    </div>



                    {/* Contact */}

                    <div className="footerBox">

                        <h3>

                            Contact Us

                        </h3>

                        <p>

                            📞 7733902183

                        </p>

                        <p>

                            ✉ Shriramacacemybansur@gmail.com

                        </p>

                        <p>

                            📍 Shubhash Chowk, Kotputli Road,
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

                                <FaFacebookF />

                            </a>

                            <a href="https://www.instagram.com/shriramacademybansur?igsh=Z3FrcjNmM2k1dXA5">

                                <FaInstagram />

                            </a>

                            <a href="https://youtube.com/@shriramacademybansur?si=DBOnHFWKPU5QqQux">

                                <FaYoutube />

                            </a>



                        </div>

                    </div>


                </div>



                <div className="copyright">

                    © 2026 The Shriram Foundation School

                </div>


            </div>


        </div>

    )

}