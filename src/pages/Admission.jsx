import { useState } from "react"
import Navbar from "../components/Navbar"

export default function Admission() {
    const [admission, setAdmission] = useState("form")
    const [form, setForm] = useState({
        student_name: "",
        father_name: "",
        class_name: "",
        phone: "",
        address: ""
    })

    const [msg, setMsg] = useState("")


    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        })

    }



    const submit = async (e) => {

        e.preventDefault()

        const res = await fetch("https://school-website-shriramacacemybansur.onrender.com/admission/add", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(form)

        })

        const data = await res.json()


        if (data.success) {

            setMsg("Your admission form submitted successfully")

            setForm({

                student_name: "",
                father_name: "",
                class_name: "",
                phone: "",
                address: ""

            })

        }

    }



    return (

        <>
            <Navbar />
            <div className="h-20 w-full  flex justify-center items-center mt-10">
                <button onClick={() => setAdmission("progress")} className={`   uppercase  hover:bg-blue-400  hover:text-white p-3 ${admission === "progress" ? "bg-blue-600  text-white" : null}`}>Admission Procss</button>
                <button onClick={() => setAdmission("structure")} className={`   uppercase   hover:bg-blue-400  hover:text-white p-3 ${admission === "structure" ? "bg-blue-600 text-white" : null}`}>Fee Structure</button>
                <button onClick={() => setAdmission("form")} className={`   uppercase    hover:bg-blue-400  hover:text-white p-3 ${admission === "form" ? "bg-blue-600 text-white" : null}`}>Admission Form</button>
            </div>

            {
                admission === "form" ? (
                    <div className="admissionPage ">
                        <h1 className=" uppercase"> Inquary Form</h1>
                        <p className="admissionSubtitle">
                            Apply for admission to our school.
                        </p>
                        <form
                            onSubmit={submit}
                            className="formBox"
                        >
                            <label>Student Name *</label>
                            <input
                                name="student_name"
                                value={form.student_name}
                                onChange={handleChange}
                                required
                            />
                            <label>Father Name *</label>
                            <input
                                name="father_name"
                                value={form.father_name}
                                onChange={handleChange}
                                required
                            />
                            <label>Class *</label>

                            <select
                                name="class_name"
                                value={form.class_name}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Class</option>
                                <option>Nursery</option>
                                <option>LKG</option>
                                <option>UKG</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option >4</option>
                                <option >5</option>
                                <option >6</option>
                                <option >7</option>
                                <option >8</option>
                                <option >9</option>
                                <option >10</option>
                            </select>
                            <label>Phone *</label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                            <label>Address *</label>
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="submit"
                                className="submitBtn"
                            >

                                Submit Application

                            </button>

                            {/* SUCCESS MESSAGE */}

                            {

                                msg && (

                                    <p className="successMsg">

                                        {msg}

                                    </p>

                                )

                            }


                        </form>

                    </div>) : null
            }


            {
                admission === "structure" ?
                    (
                        <>
                            <div class="max-w-6xl mx-auto p-6 bg-gray-50 font-sans">
                                <div class="text-center mb-10">
                                    <h1 class="text-3xl font-bold text-blue-900 uppercase tracking-wide">The Shriram Foundation School</h1>

                                    <div class="inline-block mt-4 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">
                                        FEE CHART : SESSION 2026-2027
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-100">
                                    <div class="bg-blue-600 px-6 py-4">
                                        <h2 class="text-xl font-bold text-white flex items-center">
                                            <span class="mr-2"></span> SCHOOL FEE
                                        </h2>
                                    </div>
                                    <div class="overflow-x-auto">
                                        <table class="w-full text-left border-collapse">
                                            <thead>
                                                <tr class="bg-blue-50 text-blue-900 border-b border-gray-200">
                                                    <th class="p-4 font-bold">CLASS</th>
                                                    <th class="p-4 font-bold">1st Installment (Admission)</th>
                                                    <th class="p-4 font-bold">2nd Installment (Sept)</th>
                                                    <th class="p-4 font-bold">3rd Installment (Dec)</th>
                                                    <th class="p-4 font-bold text-center bg-blue-100">TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody class="text-gray-700">
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-800">LKG & UKG</td>
                                                    <td class="p-4">12,000</td><td class="p-4">9,000</td><td class="p-4">9,000</td>
                                                    <td class="p-4 text-center font-bold bg-blue-50">30,000</td>
                                                </tr>
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-800">1 & 2</td>
                                                    <td class="p-4">13,000</td><td class="p-4">9,000</td><td class="p-4">9,000</td>
                                                    <td class="p-4 text-center font-bold bg-blue-50">31,000</td>
                                                </tr>
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-800">3 & 4</td>
                                                    <td class="p-4">14,000</td><td class="p-4">10,000</td><td class="p-4">9,000</td>
                                                    <td class="p-4 text-center font-bold bg-blue-50">33,000</td>
                                                </tr>
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-800">5 & 6</td>
                                                    <td class="p-4">15,000</td><td class="p-4">10,000</td><td class="p-4">10,000</td>
                                                    <td class="p-4 text-center font-bold bg-blue-50">35,000</td>
                                                </tr>
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-800">7 & 8</td>
                                                    <td class="p-4">16,000</td><td class="p-4">11,500</td><td class="p-4">10,000</td>
                                                    <td class="p-4 text-center font-bold bg-blue-50">37,500</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-800">9 & 10</td>
                                                    <td class="p-4">18,000</td><td class="p-4">12,000</td><td class="p-4">10,000</td>
                                                    <td class="p-4 text-center font-bold bg-blue-50">40,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="bg-gray-50 p-4 border-t italic text-sm text-gray-600">
                                        * Registration Fee (New Admission Only): <b>Rs. 1,500/-</b> | * Transport charges apply based on route.
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                    <div class="bg-blue-700 px-6 py-4">
                                        <h2 class="text-xl font-bold text-white flex items-center">
                                            <span class="mr-2"></span> HOSTEL FEE
                                        </h2>
                                    </div>
                                    <div class="overflow-x-auto">
                                        <table class="w-full text-left border-collapse">
                                            <thead>
                                                <tr class="bg-orange-50 text-blue-700 border-b border-gray-200">
                                                    <th class="p-4 font-bold">CLASS</th>
                                                    <th class="p-4 font-bold">1st Installment (Admission)</th>
                                                    <th class="p-4 font-bold">2nd Installment (Sept)</th>
                                                    <th class="p-4 font-bold">3rd Installment (Dec)</th>
                                                    <th class="p-4 font-bold text-center bg-orange-100">TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody class="text-gray-700">
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-700">2, 3 & 4</td>
                                                    <td class="p-4">35,000</td><td class="p-4">35,000</td><td class="p-4">25,000</td>
                                                    <td class="p-4 text-center font-bold bg-orange-50">95,000</td>
                                                </tr>
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-700">5 & 6</td>
                                                    <td class="p-4">40,000</td><td class="p-4">35,000</td><td class="p-4">25,000</td>
                                                    <td class="p-4 text-center font-bold bg-orange-50">100,000</td>
                                                </tr>
                                                <tr class="border-b hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-700">7 & 8</td>
                                                    <td class="p-4">45,000</td><td class="p-4">35,000</td><td class="p-4">25,000</td>
                                                    <td class="p-4 text-center font-bold bg-orange-50">105,000</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="p-4 font-semibold text-blue-700">9 & 10</td>
                                                    <td class="p-4">50,000</td><td class="p-4">35,000</td><td class="p-4">25,000</td>
                                                    <td class="p-4 text-center font-bold bg-orange-50">110,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="bg-gray-50 p-4 border-t italic text-sm text-gray-600 flex justify-between">
                                        <span>* Haircutting charge: <b>Rs. 800/-</b></span>
                                        <span>* School Exam Fee extra based on class</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
            }

            {
                admission === "progress" ?
                    (
                        <>
                            <div class="max-w-5xl mx-auto p-6 bg-white font-sans text-gray-800">
                                <div class="text-center mb-16">
                                    <h2 class="text-4xl font-extrabold text-blue-900 mb-4 italic">Admission Process</h2>
                                    <div class="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                                    <p class="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
                                        <span class="font-bold text-blue-800">THE SHRIRAM FOUNDATION SCHOOL</span> offers a high-quality educational experience and a nurturing environment. We have strived to make our admission process as simple as possible to ensure a <span class="text-orange-600 font-semibold text-nowrap">stress-free application experience</span>.
                                    </p>
                                </div>

                                <div class="relative">
                                    <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>

                                    <div class="relative mb-12 md:flex items-center justify-between">
                                        <div class="md:w-5/12 mb-4 md:mb-0 text-right pr-8 hidden md:block">
                                            <span class="text-6xl font-black text-blue-50">03</span>
                                        </div>
                                        <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-md z-10 hidden md:flex">
                                            <span class="text-white font-bold text-sm text-nowrap">STEP</span>
                                        </div>
                                        <div class="md:w-5/12 bg-gray-50 p-6 rounded-2xl shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                                            <h3 class="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Campus Visit & Interaction</h3>
                                            <p class="text-gray-600 leading-snug text-sm">
                                                Dear Parents,
                                                We cordially invite you to visit our campus and witness our vibrant learning environment. Interact with our dedicated faculty, explore our facilities, and experience the excellence we offer.
                                                We look forward to your gracious visit.                                            </p>
                                        </div>





                                    </div>

                                    <div class="relative mb-12 md:flex items-center justify-between flex-row-reverse">

                                        <div class="md:w-5/12 mb-4 md:mb-0 text-right pr-8 hidden md:block">
                                            <span class="text-6xl font-black text-blue-50 opacity-100">01</span>
                                        </div>
                                        <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-md z-10 hidden md:flex">
                                            <span class="text-white font-bold text-sm text-nowrap">STEP</span>
                                        </div>
                                        <div class="md:w-5/12 bg-gray-50 p-6 rounded-2xl shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                                            <h3 class="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Admission Enquiry</h3>
                                            <p class="text-gray-600 leading-snug text-sm md:text-base">
                                                Submit the Enquiry Form and visit the school admissions office. Our counsellor will get back to you to answer your questions and collect the required information.
                                            </p>
                                        </div>







                                    </div>

                                    <div class="relative mb-12 md:flex items-center justify-between">
                                        <div class="md:w-5/12 mb-4 md:mb-0 text-left pl-8 hidden md:block">
                                            <span class="text-6xl font-black text-orange-50">02</span>
                                        </div>
                                        <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full border-4 border-white shadow-md z-10 hidden md:flex">
                                            <span class="text-white font-bold text-sm text-nowrap">STEP</span>
                                        </div>
                                        <div class="md:w-5/12 bg-gray-50 p-6 rounded-2xl shadow-sm border-r-4 border-orange-500 hover:shadow-md transition-shadow">
                                            <h3 class="text-xl font-bold text-orange-600 mb-2 uppercase tracking-wide text-nowrap">Admission Form & Documents</h3>
                                            <p class="text-gray-600 leading-snug text-sm">
                                                Visit the Admission Office to purchase the prospectus.
                                                <span class="block mt-2 font-semibold text-gray-700">Required Documents:</span>
                                                <ul class="list-disc list-inside text-xs mt-1 grid grid-cols-2 gap-1">
                                                    <li>10 Passport Photos</li>
                                                    <li>Birth Certificate</li>
                                                    <li>Transfer Certificate</li>
                                                    <li>Residence Certificate</li>
                                                    <li>Aadhaar Card( Child)</li>
                                                    <li>Aadhaar Card( Parent's)</li>
                                                    <li>Caste Certificate</li>

                                                </ul>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="relative md:flex items-center justify-between flex-row-reverse">
                                        <div class="md:w-5/12 mb-4 md:mb-0 text-left pl-8 hidden md:block">
                                            <span class="text-6xl font-black text-green-50">04</span>
                                        </div>
                                        <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-green-500 rounded-full border-4 border-white shadow-md z-10 hidden md:flex">
                                            <span class="text-white font-bold text-sm text-nowrap">DONE</span>
                                        </div>
                                        <div class="md:w-5/12 bg-green-50 p-6 rounded-2xl shadow-sm border-r-4 border-green-500 hover:shadow-md transition-shadow">
                                            <h3 class="text-xl font-bold text-green-700 mb-2 uppercase tracking-wide">Final School Admission</h3>
                                            <p class="text-gray-600 leading-snug text-sm">
                                                Fill the final admission form and submit all documents. Kindly inform us if your child requires any special assistance due to health reasons.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
            }

        </>

    )

}