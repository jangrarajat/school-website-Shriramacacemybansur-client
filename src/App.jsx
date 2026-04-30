import Topbar from "./components/Topbar"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import About from "./pages/About"
import Admission from "./pages/Admission"
// import Admin from "./pages/Admin"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import AdminExam from "./pages/AdminExam"


import { Routes, Route } from "react-router-dom"
import TalentExam from "./pages/TalentExam"
import ContactPage from "./pages/ContactPage"
import GalleryPage from "./pages/GalleryPage"
import LoginOption from "./pages/LoginOption"
import NoticePopup from "./components/NoticePopup"
import TalentResult from "./pages/TalentResult"
import ResultComingSoon from "./pages/ResultComingSoon"

function App() {

    return (

        <div>
            <NoticePopup />
            <Topbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/admission" element={<Admission />} />

                <Route path="/admin" element={<Admin />} />

                <Route path="/theshriram-admin-aurix-2026" element={<Admin />} />

                <Route path="/talent" element={<TalentExam />} />
                <Route path="/talent-result" element={<ResultComingSoon/>} />


                <Route path="/admin/exam" element={<AdminExam />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/loginOption" element={<LoginOption />} />



            </Routes>





        </div>

    )

}

export default App