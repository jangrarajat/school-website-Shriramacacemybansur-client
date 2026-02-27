import { useEffect, useState } from "react"

export default function AdminExam() {

    const [students, setStudents] = useState([])


    useEffect(() => {

        load()

    }, [])


    const load = async () => {

       try {
         const res = await fetch(
 
             "https://school-website-shriramacacemybansur.onrender.com/admin/exam/all"
 
         )
 
         const data = await res.json()
         console.log(data)
         setStudents(data.data)
       } catch (error) {
         console.log(error)
       }

    }


    return (

        <div style={{ padding: "30px" }}>


            <h1>

                Talent Exam Students

            </h1>


            <table border="1" width="100%">


                <thead>

                    <tr>

                        <th>Roll</th>
                        <th>Name</th>
                        <th>Father</th>
                        <th>Mother</th>
                        <th>DOB</th>
                        <th>School</th>
                        <th>Address</th>
                        <th>Photo</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        students.map((s) => (

                            <tr key={s.id}>


                                <td>{s.roll}</td>

                                <td>{s.student_name}</td>

                                <td>{s.father_name}</td>

                                <td>{s.mother_name}</td>

                                <td>{s.dob}</td>

                                <td>{s.school}</td>

                                <td>{s.address}</td>

                                <td>

                                    <img
                                        src={"https://school-website-shriramacacemybansur.onrender.com/uploads/" + s.photo}
                                        width="80"
                                    />

                                </td>


                            </tr>

                        ))

                    }

                </tbody>


            </table>


        </div>

    )

}