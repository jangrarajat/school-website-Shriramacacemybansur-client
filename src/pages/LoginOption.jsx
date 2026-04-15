
import React, { useState } from "react";

function LoginOption() {

    const [showRoleModal, setShowRoleModal] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setShowRoleModal(true);
    };

    const roles = [
      { name: "Admin", link: "https://aurixai.site/site/Login" },
        { name: "Super Admin", link: "https://aurixai.site/site/Login" },
        { name: "Student", link: "https://aurixai.site/site/userlogin" },
        { name: "Parent", link: "https://aurixai.site/site/userlogin" },
        { name: "Teacher", link: "https://aurixai.site/site/Login" },
        { name: "Accountant", link: "https://aurixai.site/site/Login" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-2xl flex  items-center  justify-center  flex-col font-bold text-gray-800 mb-6">
                    <img 
                    src="https://res.cloudinary.com/djtvxmttf/image/upload/v1776240518/PHOTO-2026-04-15-13-38-11_dhhavq.jpg" 
                    alt="logo"
                    className="h-20 w-30  "
                    />
                    <span className="  text-blue-900 ">
                     WELOCME TO THE SHRIRAM FOUNDATION SCHOOL
                    </span>
                </h2>

                {/* Only Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </div>

            {/* Role Selection Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <h3 className="text-xl font-semibold text-center mb-4">
                            Select Your Role
                        </h3>

                        <div className="grid grid-cols-2 gap-3 text-center">
                            {roles.map((role, index) => (
                                <a
                                    key={index}
                                    className="border  text-center rounded-lg py-2 text-sm hover:bg-blue-600 hover:text-white transition"
                                    href={role.link}
                                >
                                    {role.name}
                                </a>
                            ))}
                        </div>

                        <button
                            className="mt-5 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                            onClick={() => setShowRoleModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default LoginOption
