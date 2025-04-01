// import './styles/tailwind.css'
import { useState, useEffect } from 'react';
const Timer = () => {
  const [time, setTime] = useState(900); // 15 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number | null = null;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime: number) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(900); // Reset to 15 minutes
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-purple-600 mb-4 text-center">Timer</h1>

        <div className="text-6xl font-bold text-purple-600 mb-8 text-center">
          {formatTime(time)}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            disabled={isRunning}
          >
            Start
          </button>

          <button
            onClick={handlePause}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            disabled={!isRunning}
          >
            Pause
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;