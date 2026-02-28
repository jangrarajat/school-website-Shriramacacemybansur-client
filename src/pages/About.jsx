import school from "../assets/school1.jpeg";
import Navbar from "../components/Navbar";

export default function About() {

    return (
        <>
              <Navbar/>
            <div>


                {/* Top Banner */}

                <div className="aboutBanner">

                    <h1>

                        About Our School

                    </h1>

                    <p>

                        Excellence in Education Since 2010

                    </p>

                </div>



                {/* About Section */}

                <div className="aboutPage">


                    <div className="aboutPageFlex">


                        {/* Image */}

                        <div className="aboutPageImageBox">

                            <img
                                src={school}
                                className="aboutPageImage"
                            />

                        </div>



                        {/* Text */}

                        <div className="aboutPageText">

                            <h2>

                                Our Journey of Excellence

                            </h2>


                            <p>

                                Since our establishment in 2019,
                                our school has been committed to
                                nurturing young minds and building
                                a strong educational foundation.

                            </p>


                            <p>

                                Our curriculum blends academic
                                knowledge with character development,
                                ensuring students achieve success.

                            </p>



                            {/* Stats */}

                            <div className="aboutStats">


                                <div className="statBox">

                                    <h1>

                                        500+

                                    </h1>

                                    <p>

                                        Active Students

                                    </p>

                                </div>


                                <div className="statBox">

                                    <h1>

                                        50+

                                    </h1>

                                    <p>

                                        Expert Faculty

                                    </p>

                                </div>


                            </div>


                        </div>



                    </div>


                </div>

                {/* MISSION VISION */}

                <div className="missionVisionSection">

                    <div className="missionVisionFlex">

                        <div className="missionCard">

                            <h2>Our Mission</h2>

                            <p className=" font-sans text-gray-700">

                                To provide a comprehensive education that develops
                                critical thinking, creativity and character in every student.
                                We create an environment where learning is joyful.

                            </p>

                        </div>


                        <div className="visionCard">

                            <h2>Our Vision</h2>

                            <p className=" text-gray-700">

                                To be a leading institution fostering innovation,
                                integrity and inclusive education. We aim to produce
                                responsible citizens and future leaders.

                            </p>

                        </div>

                    </div>

                </div>



                {/* CORE VALUES */}

                <div className="coreSection">

                    <h1>

                        Our Core Values

                    </h1>


                    <div className="coreGrid">


                        <div className="coreCard">

                            <div className="coreIcon">

                                ⭐

                            </div>

                            <h3>

                                Excellence

                            </h3>

                            <p>

                                Striving for the highest standards in all endeavors

                            </p>

                        </div>



                        <div className="coreCard">

                            <div className="coreIcon">

                                ❤

                            </div>

                            <h3>

                                Integrity

                            </h3>

                            <p>

                                Upholding moral principles and honesty

                            </p>

                        </div>



                        <div className="coreCard">

                            <div className="coreIcon">

                                💡

                            </div>

                            <h3>

                                Innovation

                            </h3>

                            <p>

                                Embracing new ideas and progressive methods

                            </p>

                        </div>



                        <div className="coreCard">

                            <div className="coreIcon">

                                👥

                            </div>

                            <h3>

                                Community

                            </h3>

                            <p>

                                Building strong connections and collaboration

                            </p>

                        </div>


                    </div>


                </div>
            </div>
        </>

    )

}