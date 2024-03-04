import React from "react";

export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2 style={{ color: "#e0e1dd" }}> Quiz Details !</h2>
      <div className="details">
        <h3>There are {numQuestions} Quetsions to check your React Mastery</h3>
        <h3>Time Limit :- 15 minutes (60 secs / Question)</h3>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
}
