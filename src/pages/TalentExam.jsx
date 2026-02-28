import { useState } from "react"
import logo from "../assets/logo.png"
import ButtonLoader from "../components/ButtonLoader"
import Navbar from "../components/Navbar"
import { FaImage, FaSearch, FaUserPlus } from "react-icons/fa"

export default function TalentExam() {
    const [submitLoader, setSubmitLoader] = useState(false)
    const [activeTab, setActiveTab] = useState("register") 
    const [searchQuery, setSearchQuery] = useState("") 
    const [searchType, setSearchType] = useState("mobile") 
    
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
            const fileSizeKB = file.size / 1024;
            if (fileSizeKB > 150) {
                setError("Image size must be less than 150KB! (Current: " + Math.round(fileSizeKB) + "KB)");
                setPhoto(null);
                setPreview("");
                e.target.value = "";
                return;
            }
            setError("");
            setPhoto(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const findAdmitCard = async (e) => {
        e.preventDefault()
        if (!searchQuery) {
            setError(`Please enter ${searchType === 'mobile' ? 'Mobile Number' : 'Roll Number'}`)
            return
        }
        setSubmitLoader(true)
        setError("")
        setStudent(null)

        try {
            const payload = {}
            payload[searchType] = searchQuery.trim()

            const res = await fetch("https://school-website-shriramacacemybansur.onrender.com/admin/findAdmitCard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            const result = await res.json()
            
            // Yahan check hai: Agar success hai lekin student null hai
            if (result.success && result.student !== null) {
                setStudent(result.student)
            } else {
                // User ko accurate message show hoga
                setError("Student details not found! Please check your " + (searchType === 'mobile' ? 'Mobile Number' : 'Roll Number') + " correctly.");
            }
        } catch (err) {
            setError("Search failed. Server error or Check connection.")
        } finally {
            setSubmitLoader(false)
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
                    #printArea { position: absolute; left: 0; top: 0; width: 100%; border: none !important; }
                    .no-print { display: none !important; }
                    @page { size: auto; margin: 10mm; }
                }
                .admit-card-box { border: 3px solid black; padding: 15px; background: white; width: 100%; max-width: 900px; margin: auto; }
                .table-custom { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .table-custom th, .table-custom td { border: 1px solid black; padding: 5px; text-align: center; font-size: 14px; }
                `}} />

                {!student ? (
                    <div className="max-w-xl mx-auto border rounded shadow bg-white overflow-hidden">
                        <div className="flex mb-4 bg-gray-100 p-1 rounded-t">
                            <button onClick={() => {setActiveTab("register"); setError("")}} className={`flex-1 py-2 font-bold flex items-center justify-center gap-2 ${activeTab === "register" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}>
                                <FaUserPlus /> Register
                            </button>
                            <button onClick={() => {setActiveTab("find"); setError("")}} className={`flex-1 py-2 font-bold flex items-center justify-center gap-2 ${activeTab === "find" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"}`}>
                                <FaSearch /> Dawnlaod Admit Card
                            </button>
                        </div>

                        <div className="w-full h-fit flex mb-5 justify-center pt-2">
                            <img className="w-56" src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772280942/Talentine_Logo_olmj8l.png" alt="" />
                        </div>

                        {activeTab === "find" ? (
                            <div className="p-6">
                                <h1 className="text-2xl font-bold mb-4 text-center text-blue-900 uppercase">Search Admit Card</h1>
                                <form onSubmit={findAdmitCard} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Search By</label>
                                        <select 
                                            className="border p-3 rounded border-gray-500 bg-gray-50 font-bold text-blue-900 outline-none focus:border-blue-600"
                                            value={searchType || "mobile"}
                                            onChange={(e) => setSearchType(e.target.value)}
                                        >
                                            <option value="mobile">Mobile Number</option>
                                            <option value="roll">Roll Number</option>
                                        </select>
                                    </div>

                                    <input 
                                        className="border p-3 rounded border-gray-500 outline-none focus:border-blue-600" 
                                        placeholder={`Enter ${searchType === 'mobile' ? 'Mobile Number' : 'Roll Number'}`} 
                                        value={searchQuery || ""} 
                                        onChange={(e) => setSearchQuery(e.target.value)} 
                                    />
                                    
                                    <button className="bg-blue-600 flex justify-center items-center text-white p-4 rounded font-bold hover:bg-blue-700 transition">
                                        {submitLoader ? <ButtonLoader /> : "Find & Print"}
                                    </button>
                                    {error && <p className="text-red-600 text-center font-bold bg-red-50 p-2 rounded border border-red-200">{error}</p>}
                                </form>
                            </div>
                        ) : (
                            <div className="p-4">
                                <h1 className="text-3xl font-bold mb-4 text-center text-blue-900 uppercase tracking-tight">talentine exam form 2026</h1>
                                <form onSubmit={submit} className="flex flex-col gap-3 rounded-xl">
                                    <label className="text-start pl-1 uppercase">Student name</label>
                                    <input className="border p-2 rounded border-gray-500" placeholder="Student Name" name="student_name" value={form.student_name || ""} onChange={handleChange} />
                                    <label className="text-start pl-1 uppercase font-bold text-gray-600">father name</label>
                                    <input className="border p-2 rounded border-gray-500" placeholder="Father Name" name="father_name" value={form.father_name || ""} onChange={handleChange} />
                                    <label className="text-start pl-1 uppercase font-bold text-gray-600">mother name</label>
                                    <input className="border p-2 rounded border-gray-500" placeholder="Mother Name" name="mother_name" value={form.mother_name || ""} onChange={handleChange} />
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-start pl-1 uppercase font-bold text-gray-600">Date of birth</label>
                                            <input type="date" className="w-full border p-2 rounded border-gray-500" name="dob" value={form.dob || ""} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="text-start pl-1 uppercase font-bold text-gray-600">Select class</label>
                                            <select className="w-full border p-2 rounded border-gray-500" name="student_class" value={form.student_class || ""} onChange={handleChange}>
                                                <option value="">Select Group</option>
                                                {["3", "4", "5", "6", "7", "8", "9"].map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <label className="text-start pl-1 uppercase font-bold text-gray-600">Mobile Number</label>
                                    <input className="border p-2 rounded border-gray-500" placeholder="WhatsApp Number" name="mobile" value={form.mobile || ""} onChange={handleChange} />
                                    
                                    <label className="text-start pl-1 uppercase font-bold text-gray-600">Exam medium</label>
                                    <select className="border p-2 rounded border-gray-500" name="medium" value={form.medium || "Hindi"} onChange={handleChange}>
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <label className="text-start pl-1 uppercase font-bold text-gray-600">Current school Name</label>
                                    <input className="border p-2 rounded border-gray-500" placeholder="School Name" name="school" value={form.school || ""} onChange={handleChange} />
                                    
                                    <label className="text-start pl-1 uppercase font-bold text-gray-600">address</label>
                                    <input className="border p-2 rounded border-gray-500" placeholder="Full Address" name="address" value={form.address || ""} onChange={handleChange} />
                                    
                                    <div className="mt-2">
                                        <p className="text-[11px] font-bold text-red-600 uppercase mb-1">* Maximum Image Size: 150KB</p>
                                        <div className="flex flex-col cursor-pointer gap-1 justify-center items-center border-2 border-dashed p-3 rounded-lg border-gray-400 bg-gray-50 hover:bg-gray-100 transition">
                                            <label htmlFor="file" className="text-xs font-bold text-gray-600 flex flex-col items-center gap-2">
                                                <FaImage className="text-2xl text-blue-500" />
                                                {photo ? <span className="text-green-600 italic">Photo Selected: {photo.name}</span> : "Click to Upload Student Photo"}
                                            </label>
                                            <input id="file" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                                        </div>
                                    </div>

                                    <button className="bg-blue-600 flex justify-center items-center text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition mt-2 shadow-lg">
                                        {submitLoader ? (<ButtonLoader />) : "SUBMIT & REGISTER"}
                                    </button>
                                    {error && <p className="text-red-600 text-center font-bold bg-red-50 p-2 rounded border border-red-200">{error}</p>}
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center pb-10">
                        <div id="printArea" className="admit-card-box">
                            <div className="flex items-center border-b-2 border-black pb-2 mb-3">
                                <img src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772290472/logo_aq3gt6.png" className="w-20 h-20 border border-black mr-4 bg-white" alt="logo" />
                                <div className="text-center flex-1">
                                    <p className="text-3xl font-black uppercase tracking-tight">The Shriram foundation school</p>
                                    <p className="text-[10px] font-bold">Subhash Chowk, Kotputli Road, Bansur (Kotputli-Behror) - Raj. 7733902183</p>
                                    <p className="text-black text-3xl px-3 py-1 inline-block mt-1 font-extrabold rounded uppercase italic border-2 border-black">TALENTine EXAM 2026</p>
                                    <p className="font-bold border-t border-black mt-1">ADMIT CARD</p>
                                </div>
                            </div>

                            <div className="flex justify-between mb-4 px-2">
                                <div className="space-y-1 flex flex-col items-start font-bold text-gray-800 text-sm">
                                    <p>Roll Number: <span className="font-black text-xl ml-1">{student.roll}</span></p>
                                    <p>Student Name: <span className="uppercase">{student.student_name}</span></p>
                                    <p>Father Name: <span className="uppercase">{student.father_name}</span></p>
                                    <p>Class Group: {student.class}th Grade</p>
                                    <p>DOB: {new Date(student.dob).toLocaleDateString('en-GB')}</p>
                                    <p>Exam Medium: {student.medium}</p>
                                </div>
                                <div className="w-36 h-44 border-2 border-black p-1 bg-white">
                                    <img src={student.photoUrl || preview} className="w-full h-full object-cover" alt="student" />
                                </div>
                            </div>

                            <table className="table-custom">
                                <thead className="bg-gray-100 uppercase">
                                    <tr>
                                        <th className="p-2 italic">Exam Center : The Shriram Foundation School, Bansur </th>
                                    </tr>
                                </thead>
                            </table>
                            <table className="table-custom mt-1">
                                <thead className="bg-gray-100 font-bold">
                                    <tr>
                                        <th className="w-1/2 p-2">Exam Date : 29 March, 2026 (Sunday) </th>
                                        <th className="p-2">Exam Time : 09:00 AM - 11:30 PM </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-50 font-bold">
                                        <td className="p-2 border border-black">Reporting Time: 08:00 AM </td>
                                        <td className="p-2 border border-black">Duration: 2.30 Hrs</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-4 text-[11px] border-t-2 border-black pt-2 text-start">
                                <p className="font-bold underline mb-1 italic uppercase">Instructions for Candidate</p>
                                <ul className="list-decimal ml-5 font-semibold leading-tight space-y-0.5">
                                    <li>Students must report at least 90 minutes before exam starts. (Reporting Time: 8:00 AM) </li>
                                    <li>Compulsory to carry Admit Card and Aadhaar Card (or valid Photo ID). </li>
                                    <li>Only blue or black ball pen is allowed. Use of pencil is strictly prohibited. </li>
                                    <li>Mobile phones, smart watches, calculators are strictly prohibited. </li>
                                    <li>Maintain silence, discipline, and good behavior. </li>
                                    <li>Any form of cheating leads to immediate cancellation. </li>
                                    <li>Students are not allowed to borrow stationery. </li>
                                    <li>Write roll number and details clearly on answer sheet. </li>
                                    <li>No student allowed to leave during the first hour. </li>
                                    <li>Follow all instructions from the invigilator. </li>
                                </ul>
                            </div>

                            <div className="flex justify-between mt-8 px-8">
                                <div className="text-center w-40 font-bold pt-1 border-t border-black text-xs uppercase">
                                    Candidate's Sign 
                                </div>
                                <div className="text-center w-48 font-bold text-xs uppercase">
                                    <img src="https://res.cloudinary.com/drrj8rl9n/image/upload/v1772266342/WhatsApp_Image_2026-02-28_at_1.34.10_PM-fotor-bg-remover-20260228134154_nzdafv.png" className="w-32 mx-auto -mb-4" alt="sign" />
                                    <div className=" pt-1">Exam Controller Sign </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8 no-print">
                            <button onClick={() => {setStudent(null); setError("")}} className="bg-gray-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">GO BACK</button>
                            <button onClick={() => window.print()} className="bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition">PRINT ADMIT CARD</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}