import React from "react";

export default function Questions({ Question, answer, dispatch, points }) {
  return (
    <div>
      <div className="ques">
        {" "}
        <p>{Question.question}</p>
      </div>
      <Options Question={Question} answer={answer} dispatch={dispatch} />

      <div className="points">
        {" "}
        <h2>POINTS: {points}</h2>
      </div>
    </div>
  );
}

function Options({ Question, answer, dispatch }) {
  const isAnswerGiven = answer !== null; // checking if answer is given or not
  return (
    <div className="options">
      {Question.options.map((option, index) => {
        return (
          <button
            style={{
              backgroundColor:
                index === Question.correctOption && isAnswerGiven
                  ? "#a7c957"
                  : "",
            }}
            className={`btn btn-option ${index === answer ? "answer" : ""}  
            ${
              isAnswerGiven
                ? index === answer && index !== Question.correctOption
                  ? "wrong"
                  : "correct"
                : ""
            } `}
            key={option}
            disabled={isAnswerGiven}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {index + 1}.{"  "}
            {option}{" "}
            {isAnswerGiven && index === Question.correctOption && (
              <span>✅</span>
            )}
            {isAnswerGiven &&
              index !== Question.correctOption &&
              index === answer && <span>❌</span>}
          </button>
        );
      })}
    </div>
  );
}
