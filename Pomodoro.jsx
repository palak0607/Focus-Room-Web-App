import React, { useState, useRef } from 'react';
import './pomodoro.css'



const PomodoroTimer = () => {
  const [timer, setTimer] = useState(25 * 60); // Initial timer value (25 minutes)
  const [isWorking, setIsWorking] = useState(true); // Flag to track work/break periods
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (isWorking) {
            setIsWorking(false); // Start break
            return 5 * 60; // Set timer to 5 minutes for break
          } else {
            setIsWorking(true); // Start work
            return 25 * 60; // Set timer to 25 minutes for work
          }
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimer(25 * 60);
    setIsWorking(true);
  };

  const skipBreak = () => {
    if (!isWorking) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimer(25 * 60);
      setIsWorking(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };



  return (
    <div className="flex flex-col  rounded-xl items-center justify-center  text-white p-10 main-pomo">
      <div className="text-2xl  mb-4 flex flex-col ">
        {isWorking ? 'Work: ' : 'Break: '}
      </div>
      <div className="to-lime-400 font-bold text-9xl">{formatTime(timer)}</div>
      <div className="flex space-x-4 m-5">
        <button className="btn-green" onClick={startTimer}>Start</button>
        <button className="btn-red" onClick={stopTimer}>Stop</button>
        <button className="btn-blue" onClick={resetTimer}>Reset</button>
        {!isWorking && (
          <button className="btn-orange" onClick={skipBreak}>Skip Break</button>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
