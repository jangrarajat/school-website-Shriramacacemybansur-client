import { useEffect, useState, useRef } from "react"
import { FaFileExcel, FaWhatsapp } from "react-icons/fa"
import * as XLSX from "xlsx"

export default function Admin() {
    const [exam, setExam] = useState([])
    const [search, setSearch] = useState("")
    const [medium, setMedium] = useState([])
    const [group, setGroup] = useState([])
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [recording, setRecording] = useState(false);
    const phoneNumber = [7023009861 , 7357167649]
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);


    const startRecording = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
            audioChunksRef.current.push(e.data);
        };

        mediaRecorder.start();

        setRecording(true);

    }


    const stopRecording = () => {

        mediaRecorderRef.current.stop();

        setRecording(false);

    }



    // Send Button

    const sendMessage = () => {

        alert("Message Sent To All");

        console.log("Message:", message);

        console.log("File:", file);

    }


    useEffect(() => {
        const password = window.prompt("Please enter the Admin Password:");
        if (password === "teacher123") {
            setIsAuthorized(true);
            loadExam();
        } else {
            alert("Access Denied: Invalid Password!");
            window.location.href = "/";
        }
    }, [])

    const loadExam = async () => {
        setLoading(true); // Fetch shuru hote hi loading true
        try {
            const res = await fetch("https://school-website-shriramacacemybansur.onrender.com/admin/exam/all")
            const data = await res.json()
            console.log(data)
            setMedium(data.mediumStats)
            setGroup(data.groupStats)
            setExam(data.data || [])
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false); // Fetch khatam hote hi loading false
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

    // Skeleton Row Component
    const SkeletonRow = () => (
        <tr style={{ borderBottom: "1px solid #eee" }}>
            {Array(11).fill(0).map((_, idx) => (
                <td key={idx} style={{ padding: "15px" }}>
                    <div className="skeleton-box"></div>
                </td>
            ))}
        </tr>
    );

    if (!isAuthorized) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Segoe UI" }}>
                <h2 style={{ color: "#1e3a5f" }}>Authenticating...</h2>
                <p>Please provide the correct password to access this page.</p>
            </div>
        );
    }

    return (

        <>

            <div className="h-screen flex fixed  justify-center items-center bg-gray-100">

                {/* WhatsApp Button */}


                {/* Popup */}

                {open && (

                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">


                        <div className="bg-white w-[500px] p-6 rounded-2xl shadow-xl">


                            <h2 className="text-2xl font-bold mb-4">

                                Send Msg To All

                            </h2>



                            {/* Message Box */}

                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write Message"
                                className="w-full h-40 border p-3 rounded-lg"
                            />



                            {/* Voice Recording */}

                            <div className="mt-4">

                                <button
                                    onClick={recording ? stopRecording : startRecording}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >

                                    {recording ? "Stop Recording 🎤" : "Start Voice Recording 🎤"}

                                </button>

                            </div>



                            {/* File Upload */}

                            <div className="mt-4">

                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />

                            </div>



                            {/* Send Button */}

                            <button
                                onClick={sendMessage}
                                className="mt-6 bg-green-600 text-white w-full py-3 rounded-xl text-lg"
                            >

                                Send Message

                            </button>



                            <button
                                onClick={() => setOpen(false)}
                                className="mt-3 w-full py-2 bg-gray-300 rounded-lg"
                            >

                                Close

                            </button>


                        </div>

                    </div>

                )}

            </div>


            <div style={{ top: "0px", padding: "40px", background: "#f4f6fb", minHeight: "100vh", fontFamily: "Segoe UI" }}>
                {/* CSS for Skeleton Animation */}
                <style>{`
                .skeleton-box {
                    height: 20px;
                    width: 100%;
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: loading 1.5s infinite;
                    border-radius: 4px;
                }
                @keyframes loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

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
                        className="bg-blue-500 flex items-center"
                        style={{

                            color: "white",
                            padding: "12px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "16px"
                        }}
                    >
                        <FaFileExcel />  Download Excel Report
                    </button>
                    <button className=" p-4 bg-green-500 rounded-lg"
                        onClick={() => setOpen(true)}
                    >
                        <FaWhatsapp />
                    </button>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Hindi: {medium.hindi || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ English: {medium.english || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Other: {medium.other || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Group-A : {group.A || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Group-B : {group.B || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Group-C : {group.C || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Group-D : {group.D || 0} ]</h3>
                    <h3 style={{ fontWeight: "bold", color: "#1e3a5f" }}>[ Total Records: {exam.length || 0} ]</h3>
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
                                <th style={th}>Group</th>
                                <th style={th}>School</th>
                                <th style={th}>Exam Center</th>
                                <th style={th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                // Loading state mein 5 skeleton rows dikhayenge
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                filtered.map((s, i) => (
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
                                        <td>{s.class}</td>
                                        <td>{s.rollWithGroup}</td>
                                        <td>{s.school}</td>
                                        <td>Shriram Academy</td>
                                        <td>
                                            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>

                                                <button style={deleteBtn} onClick={() => deleteStudent(s._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div> 
        </>
    )
}

const th = { padding: "14px", textAlign: "center" }
const viewBtn = { background: "#3498db", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }
const deleteBtn = { background: "#e74c3c", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }