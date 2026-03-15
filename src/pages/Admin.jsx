import { useEffect, useState, useRef } from "react";
import { FaFileExcel, FaWhatsapp } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Admin() {
    const [exam, setExam] = useState([]);
    const [search, setSearch] = useState("");
    const [medium, setMedium] = useState([]);
    const [group, setGroup] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Edit modal state
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [newPhoto, setNewPhoto] = useState(null);        // newly selected file
    const [newPhotoPreview, setNewPhotoPreview] = useState(""); // preview of new file

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
            audioChunksRef.current.push(e.data);
        };

        mediaRecorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const sendMessage = () => {
        alert("Message Sent To All");
        console.log("Message:", message);
        console.log("File:", file);
    };

    useEffect(() => {
        const password = window.prompt("Please enter the Admin Password:");
        if (password === "teacher123") {
            setIsAuthorized(true);
            loadExam();
        } else {
            alert("Access Denied: Invalid Password!");
            window.location.href = "/";
        }
    }, []);

    const loadExam = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://school-website-shriramacacemybansur.onrender.com/admin/exam/all");
            const data = await res.json();
            setMedium(data.mediumStats);
            setGroup(data.groupStats);
            setExam(data.data || []);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

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

    // Edit handlers
    const handleEditClick = (student) => {
        setEditData(student);
        setNewPhoto(null);
        setNewPhotoPreview("");
        setEditOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPhoto(file);
            setNewPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const formData = new FormData();
        // Saare fields ko FormData mein append karo
        Object.keys(editData).forEach(key => {
            if (key !== 'file' && key !== '_id' && editData[key] !== null && editData[key] !== undefined) {
                formData.append(key, editData[key]);
            }
        });
        // Agar naya photo hai to use bhi append karo
        if (newPhoto) {
            formData.append("photo", newPhoto);
        }

        try {
            const response = await fetch(`https://school-website-shriramacacemybansur.onrender.com/admin/exam/edit/${editData._id}`, {
                method: "PUT",
                body: formData   // FormData automatically sets multipart boundary
            });
            const result = await response.json();
            if (result.success) {
                alert("Student updated successfully!");
                setEditOpen(false);
                loadExam();
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Server error. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    const filtered = exam.filter((s) => {
        return (
            s.roll?.toString().includes(search) ||
            s.student_name?.toLowerCase().includes(search.toLowerCase()) ||
            s.school?.toLowerCase().includes(search.toLowerCase())
        );
    });

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
            {/* WhatsApp Popup - unchanged */}
            <div className="h-screen flex fixed justify-center items-center bg-gray-100">
                {open && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                        <div className="bg-white w-[500px] p-6 rounded-2xl shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Send Msg To All</h2>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write Message"
                                className="w-full h-40 border p-3 rounded-lg"
                            />
                            <div className="mt-4">
                                <button
                                    onClick={recording ? stopRecording : startRecording}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                    {recording ? "Stop Recording 🎤" : "Start Voice Recording 🎤"}
                                </button>
                            </div>
                            <div className="mt-4">
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
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

            {/* Edit Student Modal */}
            {editOpen && editData && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-[600px] p-6 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
                        <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Roll Number</label>
                                    <input type="text" name="roll" value={editData.roll || ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Student Name</label>
                                    <input type="text" name="student_name" value={editData.student_name || ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Father Name</label>
                                    <input type="text" name="father_name" value={editData.father_name || ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Date of Birth</label>
                                    <input type="date" name="dob" value={editData.dob ? editData.dob.substring(0, 10) : ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Mobile</label>
                                    <input type="text" name="mobile" value={editData.mobile || ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Medium</label>
                                    <select name="medium" value={editData.medium || ''} onChange={handleEditChange} className="w-full border p-2 rounded">
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Class</label>
                                    <input type="text" name="class" value={editData.class || ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Group (A/B/C/D)</label>
                                    <input type="text" name="rollWithGroup" value={editData.rollWithGroup || ''} onChange={handleEditChange} className="w-full border p-2 rounded" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium">School</label>
                                    <input type="text" name="school" value={editData.school || ''} onChange={handleEditChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium">Address</label>
                                    <textarea name="address" value={editData.address || ''} onChange={handleEditChange} className="w-full border p-2 rounded" rows="2"></textarea>
                                </div>
                                
                                {/* Photo Upload Field */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Current Photo</label>
                                    {editData.photoUrl && (
                                        <div className="mb-2 flex justify-center">
                                            <img src={editData.photoUrl} alt="Current" className="h-32 w-32 object-cover border rounded" />
                                        </div>
                                    )}
                                    <label className="block text-sm font-medium">Change Photo (optional)</label>
                                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full border p-2 rounded" />
                                    {newPhotoPreview && (
                                        <div className="mt-2 flex justify-center">
                                            <img src={newPhotoPreview} alt="New Preview" className="h-32 w-32 object-cover border rounded" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                                <button type="submit" disabled={updating} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    {updating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Dashboard */}
            <div style={{ top: "0px", padding: "40px", background: "#f4f6fb", minHeight: "100vh", fontFamily: "Segoe UI" }}>
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
                        <FaFileExcel /> Download Excel Report
                    </button>
                    <button className="p-4 bg-green-500 rounded-lg" onClick={() => setOpen(true)}>
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
                                <th style={th}>Address</th>
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
                                        <td className="text-start">{s.address}</td>
                                        <td>{s.medium}</td>
                                        <td>{s.class}</td>
                                        <td>{s.rollWithGroup}</td>
                                        <td>{s.school}</td>
                                        <td>Shriram Academy</td>
                                        <td>
                                            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                                <button style={editBtn} onClick={() => handleEditClick(s)}>Edit</button>
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
    );
}

const th = { padding: "14px", textAlign: "center" };
const viewBtn = { background: "#3498db", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" };
const deleteBtn = { background: "#e74c3c", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" };
const editBtn = { background: "#f39c12", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" };