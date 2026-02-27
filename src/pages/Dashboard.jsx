import { useState, useEffect } from "react";

import img1 from "../assets/school1.jpeg";
import img2 from "../assets/school2.jpeg";
import img3 from "../assets/school3.jpeg";

export default function Home() {

    const images = [img1, img2, img3]

    const [index, setIndex] = useState(0)


    /* Auto Slide */

    useEffect(() => {

        const timer = setInterval(() => {

            setIndex((prev) => (prev + 1) % images.length)

        }, 4000)

        return () => clearInterval(timer)

    }, [])


    const next = () => {

        setIndex((index + 1) % images.length)

    }


    const prev = () => {

        setIndex((index - 1 + images.length) % images.length)

    }



    return (

        <div className="homeContainer">


            {/* SLIDER */}

            <div className="heroBox">


                <img

                    src={images[index]}

                    className="heroImage"

                />


                {/* Text */}

                <div className="heroCenterText">

                    <h1>

                        Excellence in Education

                    </h1>

                    <p>

                        Nurturing Tomorrow's Leaders

                    </p>

                </div>


                {/* Arrows */}

                <div className="heroArrow left"

                    onClick={prev}

                >

                    ❮

                </div>

                <div className="heroArrow right"

                    onClick={next}

                >

                    ❯

                </div>



                {/* Dots */}

                <div className="heroDots">

                    {

                        images.map((_, i) => (

                            <div

                                key={i}

                                className={index === i ? "heroDot active" : "heroDot"}

                                onClick={() => setIndex(i)}

                            ></div>

                        ))

                    }

                </div>


            </div>



            {/* About Section */}

            <div className="aboutSection">

                <h1>

                    About Our School

                </h1>

                <p>

                    The Shriram Foundation School provides quality education
                    with modern facilities and experienced teachers.
                    We focus on discipline, knowledge and student development.

                </p>

            </div>



        </div>

    )

}