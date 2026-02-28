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
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272787/g20_tkznuk.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272783/g28_bl5tjz.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272780/g24_a90zzw.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272780/g27_ywzwln.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272779/g25_w51tja.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272779/g26_gw9ag0.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272774/g22_s8obfu.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272774/g23_unlbgl.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272772/g21_dh4i3r.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272770/g19_aly2df.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272766/g18_wcinvg.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272765/g14_b6z0yk.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272764/g16_nl27oe.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272763/g17_tn2hao.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272763/g15_li2lan.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272762/g13_qgemrw.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272755/g12_ugcrip.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272755/g9_q6b1nn.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272755/g11_ctick5.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272752/g10_xobk5w.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272752/g8_q1vpmr.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272748/g2_xjipql.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272747/g7_zh8wk1.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272745/g6_cbb8w0.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272743/g3_mnjkix.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272742/g4_gktwsf.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272742/g5_i4kw3l.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772272741/g1_iutyeh.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772271331/WhatsApp_Image_2026-02-28_at_3.02.26_PM_cexcci.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772271330/WhatsApp_Image_2026-02-28_at_2.55.48_PM_rpdnpb.jpg",
        "https://res.cloudinary.com/drrj8rl9n/image/upload/v1772271329/WhatsApp_Image_2026-02-28_at_2.56.16_PM_sfehoo.jpg",


    ];





    return (
        <>
            <Navbar />
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

                    {/* Image Modal */}

                    {selectedImage && (

                        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center  z-50">

                            <div className="relative  top-24">


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