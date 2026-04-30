import React, { useState, useEffect } from "react";

export default function NoticePopup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true); // page load pe show hoga
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 ">
      
      {/* Popup Box */}
      <div className="relative bg-white rounded-xl shadow-lg max-w-2xl w-full p-4">
        
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 -right-10 text-black text-xl font-bold"
        >
          ❌
        </button>

        {/* Image */}
        <img
          src="https://res.cloudinary.com/djtvxmttf/image/upload/v1777548696/ChatGPT_Image_Apr_30_2026_05_01_18_PM_lo9f11.png" // image public folder me rakho
          alt="Notice"
          className="w-full rounded-lg"
        />

        {/* Preview Text */}
        <div className="mt-3 text-center">
          <h2 className="text-lg font-semibold">Notice Preview</h2>
          <p className="text-gray-600 text-sm">
            Talentine Exam 2026 result date updated. Click cross to close.
          </p>
        </div>
      </div>
    </div>
  );
}