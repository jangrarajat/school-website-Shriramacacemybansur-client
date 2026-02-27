import { useState } from "react"
import Navbar from "../components/Navbar"

export default function Admission() {

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
      <Navbar/>
        <div className="admissionPage">
            <h1>Admission Form</h1>

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

        </div>
      </>

    )

}