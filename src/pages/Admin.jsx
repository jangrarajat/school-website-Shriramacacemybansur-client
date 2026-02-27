import { useEffect, useState } from "react"
import * as XLSX from "xlsx" 

export default function Admin() {
    const [exam, setExam] = useState([])
    const [search, setSearch] = useState("")
    const [medium, setMedium] = useState([])
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        // Step 1: Prompt in English
        const password = window.prompt("Please enter the Admin Password:");

        // Step 2: Password Check (Change 'teacher123' to your preferred password)
        if (password === "teacher123") {
            setIsAuthorized(true);
            loadExam();
        } else {
            alert("Access Denied: Invalid Password!");
            window.location.href = "/"; // Redirects to home page
        }
    }, [])

    const loadExam = async () => {
        try {
            const res = await fetch("https://school-website-shriramacacemybansur.onrender.com/admin/exam/all")
            const data = await res.json()
            setMedium(data.mediumStats)
            setExam(data.data || [])
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    const downloadExcel = () => {
        const excelData = filtered.map((s) => ({
            "Photo Link": s.photoUrl,
            "Roll Number": s.roll,
            "Student Name": s.student_name,
            "Father Name": s.father_name,
            "Class": s.class,
            "DOB": s.dob,
            "Mobile": s.mobile,
            "Medium": s.medium,
            "School": s.school,
            "Address": s.address,
            "Exam Date": "20 March 2026",
            "Exam Time": "10:00 AM",
            "Exam Center": "Shriram Academy Bansur"
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StudentsList");
        XLSX.writeFile(workbook, "Talent_Exam_All_Students.xlsx");
    };

    const deleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student record?")) return;
        try {
            const response = await fetch(`https://school-website-shriramacacemybansur.onrender.com/admin/exam/delete/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (result.success) {
                alert("Success: Student record deleted.");
                loadExam();
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Server error. Please try again later.");
        }
    };

    const filtered = exam.filter((s) => {
        return (
            s.roll?.toString().includes(search) ||
            s.student_name?.toLowerCase().includes(search.toLowerCase()) ||
            s.school?.toLowerCase().includes(search.toLowerCase())
        )
    })

    if (!isAuthorized) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Segoe UI" }}>
                <h2 style={{ color: "#1e3a5f" }}>Authenticating...</h2>
                <p>Please provide the correct password to access this page.</p>
            </div>
        );
    }

    return (
        <div style={{ top: "0px", padding: "40px", background: "#f4f6fb", minHeight: "100vh", fontFamily: "Segoe UI" }}>
            <h1 style={{ marginBottom: "20px", fontSize: "32px", color: "#1e3a5f" }}>
                Admin Dashboard: Student Records
            </h1>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
                <input
                    placeholder="Search by Roll / Name / School"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "12px", width: "320px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" }}
                />

                <button 
                    onClick={downloadExcel}
                    style={{
                        background: "#27ae60",
                        color: "white",
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }}
                >
                    Download Excel Report
                </button>

                <h3 style={{ fontWeight: "600", color: "#444" }}>[ Hindi: {medium.hindi || 0} ]</h3>
                <h3 style={{ fontWeight: "600", color: "#444" }}>[ English: {medium.english || 0} ]</h3>
                <h3 style={{ fontWeight: "600", color: "#444" }}>[ Other: {medium.other || 0} ]</h3>
                <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Total Records: {exam.length} ]</h3>
            </div>

            <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 5px 15px rgba(0,0,0,0.1)", overflow: "auto" }}>
                <table width="100%" style={{ borderCollapse: "collapse", fontSize: "15px" }}>
                    <thead>
                        <tr style={{ background: "#1e3a5f", color: "white" }}>
                            <th style={th}>Photo</th>
                            <th style={th}>Roll No.</th>
                            <th style={th}>Student Name</th>
                            <th style={th}>Father Name</th>
                            <th style={th}>DOB</th>
                            <th style={th}>Mobile</th>
                            <th style={th}>Medium</th>
                            <th style={th}>Class</th>
                            <th style={th}>School</th>
                            <th style={th}>Exam Center</th>
                            <th style={th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s, i) => (
                            <tr key={i} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                                <td>
                                    <img src={s.photoUrl} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", margin: "5px" }} />
                                </td>
                                <td style={{ fontWeight: "bold" }}>{s.roll}</td>
                                <td>{s.student_name}</td>
                                <td>{s.father_name}</td>
                                <td>{new Date(s.dob).toLocaleDateString('en-GB')}</td>
                                <td>{s.mobile}</td>
                                <td>{s.medium}</td>
                                <td>{s.class}th</td>
                                <td>{s.school}</td>
                                <td>Shriram Academy</td>
                                <td>
                                    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                        <button style={viewBtn} onClick={() => alert(JSON.stringify(s, null, 2))}>View</button>
                                        <button style={deleteBtn} onClick={() => deleteStudent(s._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const th = { padding: "14px", textAlign: "center" }
const viewBtn = { background: "#3498db", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }
const deleteBtn = { background: "#e74c3c", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }