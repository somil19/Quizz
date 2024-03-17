export default function Result({ points, maxScore, dispatch }) {
  const percentage = ((points / maxScore) * 100).toFixed(1);
  return (
    <div className="result-container">
      {" "}
      <h2 className="result-heading">Quiz Result</h2>{" "}
      <p className="result-info">Correct Answers: 10/15</p>{" "}
      <p className="result-score">
        {" "}
        You Score: <strong>{points}</strong> / {maxScore}{" "}
      </p>{" "}
      <p className="result-percentage">Percentage: {percentage}%</p>{" "}
      <div className="result-feedback">
        {" "}
        {points === maxScore && (
          <p className="result-message perfect-score">
            {" "}
            Great job! You got a perfect score!💯{" "}
          </p>
        )}{" "}
        {points > maxScore / 2 && points < maxScore && (
          <p className="result-message good-score">
            {" "}
            Well done! You did a good job!🎉{" "}
          </p>
        )}{" "}
        {points <= maxScore / 2 && (
          <p className="result-message low-score">
            {" "}
            Keep practicing! You can improve your score next time!🙂{" "}
          </p>
        )}{" "}
      </div>{" "}
      <button
        className="restart-button"
        onClick={() => dispatch({ type: "restart" })}
      >
        {" "}
        Continue Quizes!{" "}
      </button>{" "}
    </div>
  );
}
