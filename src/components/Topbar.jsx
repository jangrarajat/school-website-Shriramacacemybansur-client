import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

export default function Topbar() {

    return (

        <div className="topbar">

            <div className="container topflex">


                {/* LEFT */}

                <div className="leftTop">

                    <span>  📞   7733902183 </span>

                    <span className=" lowercase">📨 Shriramacacemybansur@gmail.com</span>

                </div>


                {/* RIGHT */}

                <div className="rightTop">

                    <div className="infoBox">

                        <span>⏰ 8AM - 2PM</span>

                        <span className=" uppercase">

                            📍 Shubhash Chowk, Kotputli Road,
                            Bansur (Kotputli-Behror) - Raj.

                        </span>

                    </div>


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

        </div>

    )

}