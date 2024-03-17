const HighScores = ({ highScores }) => {
  const { Mixed, JavaScript, HTML, CSS, React } = highScores;
  return (
    <div className="high-scores-container">
      <h2>High Scores ‼</h2>
      <div className="high-scores">
        <HighScore title={"Mixed"} points={Mixed} bgColor={"#20ad10"} />
        <HighScore
          title={"JavaScript"}
          points={JavaScript}
          bgColor={"#c626ee"}
        />
        <HighScore title={"HTML"} points={HTML} bgColor={"#f9dc5c"} />
        <HighScore title={"CSS"} points={CSS} bgColor={"#f15b2a"} />
        <HighScore title={"React"} points={React} bgColor={"#1098ad"} />
      </div>
    </div>
  );
};
export default HighScores;

function HighScore({ title, points, bgColor }) {
  return (
    <div className="high-scores-category">
      <span className="category-title">{title}</span>
      <div className="score">
        <span className="score-label">POINTS:</span>
        <p className="score-value">{points}</p>
      </div>
      <div
        className="high-scores-score-progress"
        style={{
          width: `${(points / 150) * 100}%`,
          backgroundColor: `${bgColor}`,
        }}
      ></div>
    </div>
  );
}
