import { useState, useEffect } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"

export default function Students() {

    const [students, setStudents] = useState([])

    useEffect(() => {

        api.get("/students")

            .then(res => setStudents(res.data))

    }, [])

    return (

        <>
            <Navbar />
            <div>

                <h1>Students</h1>

                {

                    students.map(s => (

                        <div key={s.id}>

                            {s.name}

                        </div>

                    ))

                }

            </div>
        </>

    )

}