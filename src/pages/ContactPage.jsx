import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Message Sent Successfully!");

        setFormData({
            name: "",
            email: "",
            phone: "",
            message: ""
        });
    };

    return (

        <>
        <Navbar/>
            <div className="bg-gray-100 min-h-screen py-10 px-4">

                <div className="max-w-7xl mx-auto">

                    {/* Title */}

                    <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">

                        Contact Us

                    </h1>


                    <div className="grid md:grid-cols-2 gap-10">


                        {/* Contact Form */}

                        <div className="bg-white p-8 rounded-xl shadow-lg">

                            <h2 className="text-2xl font-semibold mb-6">

                                Send Message

                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">


                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
 className="w-full border p-3 rounded-lg focus:outline-none focus:border-blue-500 order  border-gray-500"                                />


                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
 className="w-full border p-3 rounded-lg focus:outline-none focus:border-blue-500 order  border-gray-500"                                />


                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Mobile Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-3 rounded-lg focus:outline-none focus:border-blue-500 order  border-gray-500"
                                />


                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
 className="w-full border p-3 rounded-lg focus:outline-none focus:border-blue-500 order  border-gray-500"                                />


                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
                                >

                                    Send Message

                                </button>

                            </form>

                        </div>



                        {/* Contact Details */}

                        <div className="space-y-6">

                            <div className="bg-white p-6 rounded-xl shadow-lg">

                                <h2 className="text-2xl font-semibold mb-5">

                                    Contact Details

                                </h2>


                                <p className="mb-3 flex items-center gap-2">

                                    <FaPhoneAlt/> <b>Mobile:</b> 7733902183

                                </p>

                                <p className="mb-3 flex items-center  gap-2">

                                <FaEnvelope/><b>Email:</b> Shriramacacemybansur@gmail.com

                                </p>

                                <p className="mb-3 flex items-center  gap-2">

                                    <FaMapMarkerAlt/> <b>Address:</b> Shubhash Chowk, Kotputli Raod, Bansur (Kotputli-Behror) - Raj.

                                </p>

                            </div>



                            {/* Google Map */}

                            <div className="bg-white p-4 rounded-xl shadow-lg">

                                <h2 className="text-xl font-semibold mb-3">

                                    School Location

                                </h2>


                                <iframe
                                    title="map"
                                    src="https://maps.google.com/maps?q=Jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-80 rounded-lg"
                                ></iframe>


                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}