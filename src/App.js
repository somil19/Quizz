import { useEffect, useReducer } from "react";
//import ChllngBankAcc from "./otherProjects/ChllngBankAcc";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

import correct from "../src/assets/correct.mp3";
import wrong from "../src/assets/wrong.mp3";
import success from "../src/assets/success.mp3";
import Nextbutton from "./components/Nextbutton";
import Progess from "./components/Progess";
import Result from "./components/Result";
import Timer from "./components/Timer";
const initialState = {
  questions: [],
  // loading, error, ready, active, finished,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const sec_per_ques = 60;
const correctSound = new Audio(correct);
const wrongSound = new Audio(wrong);
const successSound = new Audio(success);
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * sec_per_ques,
      };
    case "newAnswer":
      const isCorrect =
        action.payload === state.questions[state.index].correctOption;

      // Dispatch an action to play sound if answer is correct
      if (isCorrect) {
        correctSound.play();
        // Dispatch action or call function to play correct sound
      } else {
        wrongSound.play();
      }
      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          (action.payload === state.questions[state.index].correctOption // if answer is correct then add points
            ? state.questions[state.index].points
            : 0),
      };
    case "nextQues":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "stop":
      successSound.play();
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: "ready",
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("INVALID REQUEST");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructuring the state because we can directly use its properties otherwise we need to use state.propertyName
  const { questions, status, index, answer, highscore, secondsRemaining } =
    state;
  useEffect(() => {
    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  return (
    <div className="app">
      {/* <h1>Radhe Radhe !</h1> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progess
              maxPoints={maxPoints}
              points={state.points}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
            <Questions
              Question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              points={state.points}
            />
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            <Nextbutton
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <Result
            points={state.points}
            maxScore={maxPoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
