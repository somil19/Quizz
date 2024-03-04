import React from "react";

export default function Nextbutton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return; // if there is no answer then return
  return (
    <div>
      {index + 1 === numQuestions ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "stop" })}
        >
          Submit
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQues" })}
        >
          Next
        </button>
      )}
    </div>
  );
}
