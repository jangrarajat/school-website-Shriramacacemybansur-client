import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ResultComingSoon() {

  function getTargetTime() {
    const now = new Date();

    // 👉 आज की date + 5:15 PM set
    const target = new Date();
    target.setHours(17); // 5 PM
    target.setMinutes(15);
    target.setSeconds(0);

    return target.getTime();
  }

  const targetDate = getTargetTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { expired: true };
    }

    return {
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
 <>
 <Navbar/>
    <div className="h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center p-10   rounded-2xl   ">
        
        <h1 className="text-4xl font-bold text-black mb-4">
          RESULT COMING SOON
        </h1>

        <p className="text-gray-400 mb-8">
          Result will be declared today at 5:15 PM
        </p>

        {timeLeft.expired ? (
          <p className="text-green-400 text-xl font-semibold">
            🎉 Result Released!
          </p>
        ) : (
          <div className="flex justify-center gap-6 text-center">
            
            <TimeBox label="Hours" value={timeLeft.hours} />
            <TimeBox label="Minutes" value={timeLeft.minutes} />
            <TimeBox label="Seconds" value={timeLeft.seconds} />

          </div>
        )}
      </div>
    </div>
 </>
  );
}

function TimeBox({ label, value }) {
  return (
    <div className=" bg-white text-black px-6 py-4 rounded-xl border ">
      <p className="text-3xl font-bold text-black">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}