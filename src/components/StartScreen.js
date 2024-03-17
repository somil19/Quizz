import React from "react";

export default function StartScreen({ numQuestions, dispatch, topic }) {
  return (
    <div className="start">
      <h2 style={{ color: "#e0e1dd" }}> Instructions!</h2>
      <div className="details">
        <div className="quizInstruction" style={{ flexDirection: "column" }}>
          <h3> ✏ Quiz Mode:</h3>
          <p>
            The Quiz ends when you have answered all the questions. Get as many
            questions right as fast as possible.
          </p>
        </div>
        <div className="quizInstruction">
          <h3>❓Number of questions:</h3>
          <p>{numQuestions}</p>
        </div>
        <div className="quizInstruction">
          <h3>⏳Time Limit:</h3>
          <p> 15 minutes</p>
        </div>
        <div className="quizInstruction">
          <h3>🔍Select Topic: </h3>
          <select
            value={topic}
            onChange={(e) =>
              dispatch({ type: "topicChoosen", payload: e.target.value })
            }
          >
            <option value="Mixed">MIXED</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JAVASCRIPT</option>
            <option value="React">REACT.JS</option>
          </select>
        </div>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
}
