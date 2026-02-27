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
                    <div className="max-w-xl mx-auto border p-6 rounded shadow bg-white">
                        <h1 className="text-xl font-bold mb-4 text-center text-blue-900  uppercase">the shriram foundation school talentine exam form 2026</h1>
                        <form onSubmit={submit} className="flex flex-col gap-3  p-4  rounded-xl">
                            <input className="border p-2 rounded  border-gray-500" placeholder="Student Name" name="student_name" onChange={handleChange} />
                            <input className="border p-2 rounded border-gray-500" placeholder="Father Name" name="father_name" onChange={handleChange} />
                            <input className="border p-2 rounded border-gray-500" placeholder="Mother Name" name="mother_name" onChange={handleChange} />
                            <div className="flex gap-2">
                                <input type="date" className="border p-2 w-1/2 rounded border-gray-500" name="dob" onChange={handleChange} />
                                <select className="border p-2 w-1/2 rounded border-gray-500" name="student_class" onChange={handleChange}>
                                    <option value="">Select Class</option>
                                    {["3", "4", "5", "6", "7", "8", "9"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <input className="border p-2 rounded border-gray-500" placeholder="Mobile Number" name="mobile" onChange={handleChange} />
                            <select className="border p-2 rounded border-gray-500" name="medium" onChange={handleChange}>
                                <option value="English">Select medium</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Other">Other</option>
                            </select>
                            {form.medium === "Other" && <input className="border p-2 rounded" placeholder="Specify Medium" name="other_medium" onChange={handleChange} />}
                            <input className="border p-2 rounded border-gray-500" placeholder="School Name" name="school" onChange={handleChange} />
                            <input className="border p-2 rounded border-gray-500" placeholder="Address" name="address" onChange={handleChange} />
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
                                <img src={logo} className="w-20 h-20 border border-black mr-4" alt="logo" />
                                <div className="text-center flex-1">
                                    <p className="text-3xl font-black ">Shriram Academy</p>
                                    <p className="text-sm font-semibold">Subhash Chowk, Kotputli Road, Bansur (Kotputli-Behror) - Raj.</p>
                                    <p className="text-sm font-bold">Mobile: 7733902183</p>
                                    <h2 className="bg-red-600 text-white px-3 py-1 inline-block mt-1 font-bold rounded">TALENT SEARCH EXAM ADMIT CARD</h2>
                                </div>
                            </div>

                            <div className="flex justify-between mb-4">
                                <div className="space-y-1 flex flex-col items-start font-bold text-gray-800">
                                    <p>Roll Number: <span className="text-2xl text-red-600">{student.roll}</span></p>
                                    <p>Student Name: {student.student_name}</p>
                                    <p>Father Name: {student.father_name}</p>
                                    <p>Class: {student.class}th</p>
                                    <p>DOB: {new Date(student.dob).toLocaleDateString('en-GB')}</p>
                                    <p>Medium: {student.medium}</p>
                                    <p>Exam Center: Shriram Academy, Bansur</p>
                                </div>
                                <div className="w-36 h-40 border-2 border-black">
                                    <img src={student.photoUrl || preview} className="w-full h-full object-cover" alt="student" />
                                </div>
                            </div>

                            <h3 className="font-bold text-center underline uppercase">Exam Pattern & Marks Detail</h3>
                            <table className="table-custom">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th>Part</th>
                                        <th>Subject</th>
                                        <th>Questions</th>
                                        <th>Marks</th>
                                        <th>Exam Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Part 1</td>
                                        <td>Mathematics</td>
                                        <td>30</td>
                                        <td>40</td>
                                        <td rowSpan="3" className="font-bold">
                                            20 March 2026 <br /> 10:00 AM - 12:00 PM
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Part 2</td>
                                        <td>Reasoning</td>
                                        <td>30</td>
                                        <td>40</td>
                                    </tr>
                                    <tr>
                                        <td>Part 3</td>
                                        <td>GK / Science</td>
                                        <td>20</td>
                                        <td>20</td>
                                    </tr>
                                    <tr className="bg-gray-50 font-bold">
                                        <td colSpan="2">TOTAL</td>
                                        <td>80 Questions</td>
                                        <td>100 Marks</td>
                                        <td>Duration: 2 Hrs</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-4 text-[12px] border-t border-black pt-2">
                                <p className="font-bold underline">Instructions for Candidate:</p>
                                <ul className="list-decimal ml-5 font-semibold">
                                    <li>Admit card ke bina pariksha kendra mein pravesh nahi milega.</li>
                                    <li>Pariksha shuru hone se 30 minute pehle pahuchein.</li>
                                    <li>Sirf Blue ya Black ball point pen ka upyog karein.</li>
                                    <li>Mobile aur calculator sakht mana hai.</li>
                                </ul>
                            </div>

                            <div className="flex justify-between mt-8">
                                <div className="text-center border-t border-black w-40 font-bold pt-1">Candidate Sign</div>
                                <div className="text-center border-t border-black w-40 font-bold pt-1">Director Sign</div>
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