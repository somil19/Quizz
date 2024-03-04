import React, { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const min = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const timeCount = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(timeCount); // cleanup function for clearing the timer
      // clearInterval is used to clear the timer
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}: {secs < 10 && "0"}
      {secs}
    </div>
  );
}
