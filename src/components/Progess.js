import React from "react";

export default function Progess({
  maxPoints,
  points,
  answer,
  numQuestions,
  index,
}) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)}>
        {" "}
      </progress>
      {/*we are adding Number(answer !== null) to check if answer is not null the increase the progress bar by 1 + index */}
      <p>
        Question{"  "}
        <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </div>
  );
}
