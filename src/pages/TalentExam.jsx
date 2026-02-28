import { useState } from "react"
import logo from "../assets/logo.png"
import ButtonLoader from "../components/ButtonLoader"
import Navbar from "../components/Navbar"
import { FaImage } from "react-icons/fa"

export default function TalentExam() {
    const [submitLoader, setSubmitLoader] = useState(false)
    const [form, setForm] = useState({
        student_name: "",
        father_name: "",
        mother_name: "",
        dob: "",
        address: "",
        school: "",
        mobile: "",
        medium: "Hindi",
        other_medium: "",
        student_class: ""
    })

    const [photo, setPhoto] = useState(null)
    const [preview, setPreview] = useState("")
    const [student, setStudent] = useState(null)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPhoto(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const submit = async (e) => {
        console.log(form)
        e.preventDefault()
        setSubmitLoader(true)
        setError("")

        if (!form.student_name || !form.student_class || !photo || !form.dob) {
            setError("All Input are requried")
            setSubmitLoader(false)
            return
        }

        try {
            const data = new FormData()
            Object.keys(form).forEach(key => {
                if (key === 'medium' && form.medium === "Other") {
                    data.append("medium", form.other_medium)
                } else {
                    data.append(key, form[key])
                }
            })
            data.append("photo", photo)

            const res = await fetch("https://school-website-shriramacacemybansur.onrender.com/exam/register", {
                method: "POST",
                body: data
            })
            const result = await res.json()
            if (result.success) {
                setStudent(result.student)
            } else {
                setError(result.message)
            }
        } catch (error) {
            setError("Server error!")
        } finally {
            setSubmitLoader(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="examPage p-4">
                <style dangerouslySetInnerHTML={{
                    __html: `
                @media print {
                    body * { visibility: hidden; }
                    #printArea, #printArea * { visibility: visible; }
                    #printArea { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%;
                        border: none !important;
                    }
                    .no-print { display: none !important; }
                    @page { size: auto; margin: 10mm; }
                }
                .admit-card-box {
                    border: 3px solid black;
                    padding: 15px;
                    background: white;
                    width: 100%;
                    max-width: 900px;
                    margin: auto;
                }
                .table-custom { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .table-custom th, .table-custom td { border: 1px solid black; padding: 5px; text-align: center; font-size: 14px; }
                
                /* Accordion Styling */
                details summary { cursor: pointer; transition: 0.3s; }
                details[open] summary { margin-bottom: 10px; color: #2563eb; }
            `}} />

                {!student ? (
                    <div className="max-w-xl mx-auto border  rounded shadow bg-white">
                        <h1 className="text-3xl font-bold mb-4 text-center text-blue-900  uppercase">  talentine exam form 2026</h1>
                        <form onSubmit={submit} className="flex flex-col gap-3  p-4  rounded-xl">
                            <label htmlFor="" className=" text-start pl-1 uppercase">Student name</label>
                            <input className="border p-2 rounded  border-gray-500" placeholder="Student Name" name="student_name" onChange={handleChange} />
                            <label htmlFor="" className=" text-start pl-1 uppercase">father name</label>
                            <input className="border p-2 rounded border-gray-500" placeholder="Father Name" name="father_name" onChange={handleChange} />
                            <label htmlFor="" className=" text-start pl-1 uppercase">mother name</label>
                            <input className="border p-2 rounded border-gray-500" placeholder="Mother Name" name="mother_name" onChange={handleChange} />

                            <label htmlFor="" className=" text-start pl-1 uppercase">Date of birth</label>
                            <input type="date" className="border p-2  rounded border-gray-500" name="dob" onChange={handleChange} />
                            <label htmlFor="" className=" text-start pl-1 uppercase">Select class Group</label>
                            <select className="border p-2  rounded border-gray-500" name="student_class" onChange={handleChange}>
                                <option value="">Select class Group</option>
                                {["3", "4", "5", "6", "7", "8", "9"].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <label htmlFor="" className=" text-start pl-1 uppercase">Mobile Number</label>
                            <input className="border p-2 rounded border-gray-500" placeholder="Mobile Number" name="mobile" onChange={handleChange} />
                            <label htmlFor="" className=" text-start pl-1 uppercase">Exam  medium</label>
                            <select className="border p-2 rounded border-gray-500" name="medium" onChange={handleChange}>
                                <option value="English">Select medium</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Other">Other</option>
                            </select>
                            <label htmlFor="" className=" text-start pl-1 uppercase">Current school Name</label>
                            {form.medium === "Other" && <input className="border p-2 rounded" placeholder="Specify Medium" name="other_medium" onChange={handleChange} />}

                            <input className="border p-2 rounded border-gray-500" placeholder="School Name" name="school" onChange={handleChange} />
                            <label htmlFor="" className=" text-start pl-1 uppercase">address</label>
                            <input className="border p-2 rounded border-gray-500" placeholder="Address" name="address" onChange={handleChange} />
                            <label htmlFor="" className=" text-start pl-1 uppercase">Upload Student Photo:</label>
                            <div className="flex flex-col cursor-pointer gap-1 justify-center items-center border p-3 rounded-sm border-gray-500">
                                <label htmlFor="file" className=" text-xs font-bold text-gray-600  flex items-center gap-2  ">Upload Student Photo: <FaImage /></label>
                                <input id="file" type="file" className="border p-1 rounded hidden border-gray-500" onChange={handlePhoto} />
                            </div>
                            <button className="bg-blue-600 flex justify-center items-center text-white p-4 rounded font-bold hover:bg-blue-700 transition">
                                {submitLoader ? (<ButtonLoader />) : "Submit Form"}
                            </button>
                            {error && <p className="text-red-600 text-center font-bold">{error}</p>}
                        </form>

                        {/* TERMS & CONDITIONS DROPDOWN */}
                        <div className="mt-6 border-t pt-4">
                            <details className="bg-gray-50 p-3 rounded-lg border">
                                <summary className="font-bold text-blue-700 list-none flex items-center gap-2">
                                    <span>▶</span> Exam Terms & Conditions (नियम एवं शर्तें)
                                </summary>
                                <div className="text-[13px] text-gray-700 mt-2 space-y-4">
                                    <div className="english-terms">
                                        <p className="font-bold border-b mb-1">English:</p>
                                        <ol className="list-decimal ml-5 space-y-1">
                                            <li>Before filling out the form, students must make sure they choose the correct group.</li>
                                            <li>All information must be correct. Wrong info leads to rejection.</li>
                                            <li>No changes allowed after submission.</li>
                                            <li>Mistakes found in group/form leads to disqualification before result.</li>
                                            <li>Admit card is mandatory for entry.</li>
                                            <li>Bring Aadhaar Card and Admit Card to the center.</li>
                                            <li>Reach the center 1 hour 30 minutes before exam time.</li>
                                            <li>Maintain discipline in the exam hall.</li>
                                            <li>Electronic devices (Mobile, Watch, Calculator) are strictly prohibited.</li>
                                            <li>Cheating leads to immediate disqualification.</li>
                                            <li>Merit rank students must complete document verification.</li>
                                            <li>Selected students must submit Aadhaar and Marksheet photocopies at school.</li>
                                        </ol>
                                    </div>
                                    <div className="hindi-terms">
                                        <p className="font-bold border-b mb-1">Hindi:</p>
                                        <ol className="list-decimal ml-5 space-y-1">
                                            <li>फॉर्म भरने से पहले विद्यार्थी सही ग्रुप का चयन सुनिश्चित करें।</li>
                                            <li>गलत या अधूरी जानकारी होने पर फॉर्म निरस्त किया जा सकता है।</li>
                                            <li>जमा करने के बाद किसी भी प्रकार का परिवर्तन स्वीकार नहीं होगा।</li>
                                            <li>गलती पाए जाने पर परिणाम से पहले परीक्षा से बाहर कर दिया जाएगा।</li>
                                            <li>वैध प्रवेश पत्र के बिना परीक्षा कक्ष में प्रवेश की अनुमति नहीं होगी।</li>
                                            <li>परीक्षा केंद्र पर आधार कार्ड और प्रवेश पत्र साथ लाना अनिवार्य है।</li>
                                            <li>परीक्षा समय से 1 घंटा 30 मिनट पहले केंद्र पर उपस्थित होना होगा।</li>
                                            <li>परीक्षा के सभी नियमों और अनुशासन का पालन करना होगा।</li>
                                            <li>मोबाइल, स्मार्ट वॉच, कैलकुलेटर जैसे उपकरण प्रतिबंधित हैं।</li>
                                            <li>नकल करते पाए जाने पर तुरंत अयोग्य घोषित कर दिया जाएगा।</li>
                                            <li>रैंक में शामिल विद्यार्थियों को दस्तावेज सत्यापन करवाना अनिवार्य होगा।</li>
                                            <li>चयनित विद्यार्थियों को मार्कशीट और आधार की कॉपी विद्यालय में जमा करनी होगी।</li>
                                        </ol>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                ) : (
                    /* Admit Card Section remains the same */
                    <div className="flex flex-col items-center">
                        <div id="printArea" className="admit-card-box">
                            <div className="flex items-center border-b-2 border-black pb-2 mb-3">
                                <img src={logo} className="w-20 h-20 border border-black mr-4"
                                    alt="logo" />
                                <div className="text-center flex-1">
                                    <p className="text-3xl font-black uppercase  ">The Shriram foundation school</p>
                                    <p className="text-sm font-semibold">Subhash Chowk, Kotputli Road, Bansur (Kotputli-Behror) - Raj. 7733902183 , 8740802183 , 9983002183</p>
                                    <p className="text-sm font-bold"></p>
                                    <p className="text-black   text-3xl  px-3 py-1 inline-block mt-1 font-extrabold rounded uppercase">TALENTine EXAM 2026  </p>
                                    <p className=" font-bold">Admit Card</p>
                                </div>
                            </div>

                            <div className="flex justify-between mb-4">
                                <div className="space-y-1 flex flex-col items-start font-bold text-gray-800">
                                    <p>Roll Number: <span className="">{student.roll}</span></p>
                                    <p>Student Name: {student.student_name}</p>
                                    <p>Father Name: {student.father_name}</p>
                                    <p>Class Group: {student.class}th</p>
                                    <p>DOB: {new Date(student.dob).toLocaleDateString('en-GB')}</p>
                                    <p>Exam Medium: {student.medium}</p>
                                    {/* <p>Exam Center: </p> */}
                                </div>
                                <div className="w-36 h-40 border-2 border-black">
                                    <img src={student.photoUrl || preview} className="w-full h-full object-cover" alt="student" />
                                </div>
                            </div>

                            {/* <h3 className="font-bold text-center underline uppercase">Exam Pattern & Marks Detail</h3> */}
                            <table className="table-custom">
                                <thead className="bg-gray-100">
                                    <tr>

                                        <th className=" uppercase text-3xl">Exam Center : The Shriram Foundation School</th>
                                    </tr>
                                </thead>

                            </table>
                            <table className="table-custom">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="w-1/2">Exam Date : 29 March ,  2026 (Sunday)</th>
                                        <th>Exam Time : 09:00 AM - 11:30 PM  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-50 font-bold">
                                        <td>Reporting Time:08:00 AM ,</td>
                                        <td> Duration: 2.30 Hrs</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-4 text-[12px] border-t border-black pt-2">
                                <p className="font-bold underline">Instructions for Candidate:</p>
                                <ul className=" list-decimal ml-5 font-semibold text-start ">
                                    <li>Students must report to the examination hall at least 90 minutes before the exam starts. (Reporting Time: 8:00 AM)

                                    </li>
                                    <li>
                                        It is compulsory to carry the Admit Card and Aadhaar Card (or any valid Photo ID proof) to enter the examination hall.

                                    </li>
                                    <li>
                                        Only blue or black ball pen is allowed. Use of pencil is strictly prohibited.
                                    </li>
                                    <li>
                                        Mobile phones, smart watches, calculators (unless allowed), or any electronic devices are strictly prohibited inside the examination hall.
                                    </li>
                                    <li>
                                        Mobile aur calculator sakht mana hai.
                                    </li>
                                    <li>
                                        Students must maintain silence, discipline, and good behavior during the examination.
                                    </li>
                                    <li>
                                        Any form of cheating, copying, or use of unfair means will result in immediate cancellation of the exam and strict action by the authorities.
                                    </li>
                                    <li>
                                        Students are not allowed to borrow or exchange stationery items during the examination.
                                    </li>
                                    <li>
                                        Students must write their roll number and other required details clearly on the answer sheet.
                                    </li>
                                    <li>
                                        No student will be allowed to leave the examination hall during the first hour of the exam.
                                    </li>
                                    <li>
                                        Students must follow all instructions given by the invigilator and examination authorities.
                                    </li>
                                    <li>
                                        In case of absence, re-examination will not be conducted without a valid medical certificate approved by the school authorities.
                                    </li>
                                </ul>
                            </div>

                            <div className="flex justify-between mt-8">
                                <div className="text-center   w-40 font-bold pt-1">
                                    <div className=" w-40 h-20 border-none relative">
                                        <img src="" alt=""
                                            className=" w-full h-full"
                                        />

                                    </div>
                                    Candidate's Sign
                                </div>
                                <div className="text-center  w-40 font-bold pt-1">

                                    <div className=" w-40 h-20 relative">
                                        <img src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772266342/WhatsApp_Image_2026-02-28_at_1.34.10_PM-fotor-bg-remover-20260228134154_nzdafv.png" alt=""
                                            className=" w-full h-full"
                                        />

                                    </div>
                                    Exam Controller Sign
                                </div>

                            </div>
                        </div>

                        <button onClick={() => window.print()} onTouchStart={() => window.print()} className="no-print bg-green-700 text-white px-8 py-3 rounded-full font-bold mt-5 shadow-xl hover:scale-105 transition">
                            PRINT ADMIT CARD
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}