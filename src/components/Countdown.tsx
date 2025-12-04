import { useState, useEffect } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date();

    // Set target to 11:00 AM tomorrow if it's past 11:00 AM today
    if (
      now.getHours() >= 11 ||
      (now.getHours() === 10 && now.getMinutes() >= 1)
    ) {
      target.setDate(now.getDate() + 1);
    }
    target.setHours(11, 0, 0, 0); // 11:00:00 AM

    const diff = target.getTime() - now.getTime();

    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="text-center my-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">
          Counting Down Until Your Email Arrives!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-blue-300">
          Hang tight! Your email for items that will be expiring in 3 days will be landing in your inbox shortly.
        </p>
      </div>
      <div className="flex justify-center gap-4 text-center text-white text-lg sm:text-xl md:text-2xl font-semibold my-4">
        <div className="bg-blue-500 rounded-lg px-4 py-2 min-w-[60px]">
          <div>{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div className="bg-green-500 rounded-lg px-4 py-2 min-w-[60px]">
          <div>{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="bg-red-500 rounded-lg px-4 py-2 min-w-[60px]">
          <div>{String(timeLeft.seconds).padStart(2, "0")}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </>
  );
};

export default Countdown;