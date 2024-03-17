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
import Notification from "./components/Notification";
import notify from "./assets/stop.mp3";
import HighScore from "./components/HighScore";
// import questions from "./data/questions.json";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished,
  status: "loading",
  index: 0,
  answer: null,
  topic: "Mixed",
  totalCorrect: 0,
  totalWrong: 0,
  points: {
    Mixed: 0,
    HTML: 0,
    CSS: 0,
    JavaScript: 0,
    React: 0,
  },
  highScores: {
    Mixed: 0,
    HTML: 0,
    CSS: 0,
    JavaScript: 0,
    React: 0,
  },
  secondsRemaining: null,
  showNotification: true,
};

const sec_per_ques = 60;
const correctSound = new Audio(correct);
const wrongSound = new Audio(wrong);
const successSound = new Audio(success);
const notifySound = new Audio(notify);
const reducer = (state, action) => {
  switch (action.type) {
    case "topicChoosen":
      return {
        ...state,
        topic: action.payload,
      };
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
      let category = state.topic;
      console.log(`state.points.${category}`, state[category]);

      return {
        ...state,
        answer: action.payload,
        totalCorrect: state.totalCorrect + (isCorrect ? 1 : 0),
        totalWrong: state.totalWrong + (!isCorrect ? 1 : 0),
        points: {
          ...state.points,
          [category]:
            state.points[category] +
            (action.payload === state.questions[state.index].correctOption // if answer is correct then add points
              ? state.questions[state.index].points
              : 0),
        },
      };
    case "nextQues":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "stop":
      successSound.play();
      let highCategory = state.topic;
      console.log(state.totalCorrect);
      console.log(state.totalWrong);
      return {
        ...state,
        status: "finished",

        highScores: {
          ...state.highScores,
          [highCategory]:
            state.points[highCategory] > state.highScores[highCategory]
              ? state.points[highCategory]
              : state.highScores[highCategory],
        },
      };
    case "restart":
      return {
        ...initialState,
        highScores: {
          ...state.highScores,
        },
        questions: state.questions,
        status: "ready",
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "notify":
      return {
        ...state,
        showNotification: false,
      };
    default:
      throw new Error("INVALID REQUEST");
  }
};
function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructuring the state because we can directly use its properties otherwise we need to use state.propertyName

  const {
    questions,
    status,
    index,
    answer,
    highScores,
    secondsRemaining,
    topic,
  } = state;
  useEffect(() => {
    fetch(`http://localhost:5000/subjects`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        //console.log(topic);
        let quizData = data.find((quiz) => quiz.name === topic).questions;
        let shuffledQuestions = shuffleArray(quizData);
        // console.log(shuffledQuestions);
        dispatch({ type: "dataReceived", payload: shuffledQuestions });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "dataFailed" });
      });
  }, [topic]);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  if (secondsRemaining === 60) {
    notifySound.play();
  }
  return (
    <div className="app">
      {/* <h1>Radhe Radhe !</h1> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            topic={topic}
          />
        )}
        {status === "active" && (
          <>
            <Progess
              maxPoints={maxPoints}
              points={state.points[`${topic}`]}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
            <Questions
              Question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              points={state.points[`${topic}`]}
            />
            {secondsRemaining <= 60 && state.showNotification && (
              <Notification dispatch={dispatch} />
            )}
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
          <>
            <Result
              points={state.points[topic]}
              maxScore={maxPoints}
              dispatch={dispatch}
            />
            <HighScore highScores={highScores} />
          </>
        )}
      </Main>
    </div>
  );
}
