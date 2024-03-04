import React from "react";

export default function Result({ points, maxScore, highscore, dispatch }) {
  const percentage = (points / maxScore) * 100;
  return (
    <>
      <div className="result">
        You Scored <strong>{points}</strong> out of {maxScore} (
        {Math.ceil(percentage)}%)
      </div>
      <div className="highscore">(HighScore: {highscore} points)</div>
      <button
        className="btn restart"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz!
      </button>
    </>
  );
}
