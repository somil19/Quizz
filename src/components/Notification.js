export default function Notification({ dispatch }) {
  return (
    <div className="notification">
      <div className="notititle">Time Alert</div>
      <div className="notibody">Only 1 minute left! Finish your quiz.</div>
      <button className="button" onClick={() => dispatch({ type: "notify" })}>
        Close
      </button>
    </div>
  );
}
