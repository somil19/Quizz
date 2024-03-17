import React, { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const min = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(() => {
    const timeCount = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(timeCount); // Cleanup function for clearing the timer
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}: {secs < 10 && "0"}
      {secs}
    </div>
  );
}
