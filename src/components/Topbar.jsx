import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Topbar() {
    return (
        <div className="topbar bg-[#1e3a5f] text-white py-2 border-b border-white/10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
                
                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] md:text-xs">
                    <span className="flex items-center gap-1">📞 7733902183</span>
                    <span className="lowercase flex items-center gap-1">📨 Shriramacacemybansur@gmail.com</span>
                </div>

                {/* Timing & Socials */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4 text-[10px] md:text-xs border-r border-white/30 pr-4">
                        <span>⏰ 8AM - 2PM</span>
                        <span className="uppercase">📍 Bansur, Rajasthan</span>
                    </div>
                    
                    <div className="icons flex items-center gap-3">
                        <a href="https://www.facebook.com/share/1FqqMpuE7m/" className="hover:text-blue-400"><FaFacebookF size={14} /></a>
                        <a href="https://www.instagram.com/shriramacademybansur" className="hover:text-pink-400"><FaInstagram size={14} /></a>
                        <a href="https://youtube.com/@shriramacademybansur" className="hover:text-red-500"><FaYoutube size={14} /></a>
                    </div>
                </div>

            </div>
        </div>
    );
}