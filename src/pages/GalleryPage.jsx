import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function GalleryPage() {

    const [selectedImage, setSelectedImage] = useState(null);


    /* School Images */

    const images = [

        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193083/WhatsApp_Image_2026-02-27_at_5.01.32_PM_apm6i1.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193082/WhatsApp_Image_2026-02-27_at_5.01.32_PM_2_dkuma7.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193082/WhatsApp_Image_2026-02-27_at_5.01.31_PM_t7drdf.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193082/WhatsApp_Image_2026-02-27_at_5.01.32_PM_1_krk6nn.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193082/WhatsApp_Image_2026-02-27_at_5.01.34_PM_zi5wlj.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193081/WhatsApp_Image_2026-02-27_at_5.01.35_PM_jdzidh.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193080/WhatsApp_Image_2026-02-27_at_5.01.37_PM_s4cxqz.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193080/WhatsApp_Image_2026-02-27_at_5.01.33_PM_iylod3.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193080/WhatsApp_Image_2026-02-27_at_5.01.36_PM_p8tdoo.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193080/WhatsApp_Image_2026-02-27_at_5.01.33_PM_2_l39y0c.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193079/WhatsApp_Image_2026-02-27_at_5.01.33_PM_1_p8luah.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772193079/WhatsApp_Image_2026-02-27_at_5.01.38_PM_skk0oc.jpg",
       
    ];


    /* School Videos */

    const videos = [

        "/videos/video1.mp4",
        "/videos/video2.mp4"

    ];


    return (
        <>
  <Navbar/>
            <div className="bg-gray-100 min-h-screen py-10 px-4">


                <div className="max-w-7xl mx-auto">


                    {/* Title */}

                    <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">

                        School Gallery

                    </h1>



                    {/* Photos Section */}

                    <h2 className="text-2xl font-semibold mb-6">

                        School Photos

                    </h2>


                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


                        {images.map((img, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
                                onClick={() => setSelectedImage(img)}
                            >

                                <img
                                    src={img}
                                    className="w-full h-56 object-cover"
                                />

                            </div>

                        ))}


                    </div>



                    {/* Videos Section */}

                    {/* <h2 className="text-2xl font-semibold mt-12 mb-6">

                        School Videos

                    </h2> */}



                    {/* <div className="grid md:grid-cols-2 gap-8">


                        {videos.map((video, index) => (

                            <div
                                key={index}
                                className="bg-white p-3 rounded-xl shadow-lg"
                            >

                                <video
                                    controls
                                    className="w-full rounded-lg"
                                >

                                    <source src={video} type="video/mp4" />

                                </video>

                            </div>

                        ))}


                    </div> */}



                    {/* Image Modal */}

                    {selectedImage && (

                        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">

                            <div className="relative">


                                <img
                                    src={selectedImage}
                                    className="max-h-[80vh] rounded-lg"
                                />


                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-2 right-2 bg-white px-3 py-1 rounded-lg text-black"
                                >

                                    X

                                </button>


                            </div>

                        </div>

                    )}



                </div>

            </div>
        </>

    );

}