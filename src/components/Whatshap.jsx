import { useState, useRef } from "react";

export default function WhatsAppPanel() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [recording, setRecording] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);



    // Voice Record

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



    return (

        <div className="h-screen flex justify-center items-center bg-gray-100">

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

    )
}