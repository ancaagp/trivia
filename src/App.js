import './style.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { shuffleArray, decodeHtml} from './utils';
import Question from "./components/Question";
import LoadingScreen from './components/LoadingScreen';
import Confetti from 'react-confetti';
import blob1 from './images/blob1.svg';
import blob2 from './images/blob2.svg';



function App(){

    // base states
    let baseScore = 0;
    let baseUserAnswers = new Map([])
    let baseQuestions = []
    let baseGameState = "welcome"

    // states
    const [questions, setQuestions] = useState(baseQuestions);
    const [score, setScore] = useState(baseScore);
    const [userAnswers, setUserAnswers] = useState(baseUserAnswers)
    const [gameState, setGameState] = useState(baseGameState)
    const [loading, setLoading] = useState(true)
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    // getting the data from the API
    const getData = () => {
        setLoading(true);
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
        .then(res => res.json())
        .then(data => {
            // changing data object so it would have another property that joins all answer options
            let questions = data.results.map(question => {
                question.question = decodeHtml(question.question);
                let answersArray = [...question.incorrect_answers];
                answersArray.push(question.correct_answer);
                shuffleArray(answersArray);

                let newQuestion = {
                    ...question,
                    all_answers: answersArray
                };
                setLoading(false);
                return newQuestion;
            });
            setQuestions(questions);
        });
    };

    // setting window size to take the current window size
    const handleWindowSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    useEffect(() => {
        getData();
        window.onresize = () => handleWindowSize();
      },[])
    
    
    const startGame = () => {
        setGameState("play")
    }

    const resetGame = () => {
        setQuestions(baseQuestions)
        setScore(baseScore);
        setUserAnswers(baseUserAnswers);
        setGameState("play")
        getData();
    }

    function updateUserAnswer(question, answer){
        setUserAnswers(oldUserAnswers => {
            const nextUserAnswers = new Map(oldUserAnswers);
            nextUserAnswers.set(question, answer)
            return nextUserAnswers;
        });
    }

    function checkAnswers(){
        if (userAnswers.size === 5) {
            let newScore = 0;
            questions.map(question => {
                console.log(question.correct_answer)
                let userAnswer = userAnswers.get(question.question);
                if (userAnswer === question.correct_answer){
                    newScore ++;
                }
            })
            setScore(newScore);
            setGameState("results");
        }
    }

    const renderedQuestions = questions.map(question => {
        return <div key={nanoid()}>
            <Question 
                    id={nanoid()}
                    question={question.question}
                    correct_answer={question.correct_answer}
                    incorrect_answers={question.incorrect_answers}
                    all_answers={question.all_answers}
                    difficulty={question.difficulty}
                    updateUserAnswer={updateUserAnswer}
                    selectedAnswer={userAnswers.get(question.question)}
                    gameState={gameState}
            />

            {/* adding line divider between questions */}
            <hr
                style={{
                    background: '#283618',
                    height: '1px',
                    opacity: '50%',
                    border: 'none',
                    margin: '10px'
                }}
            />
        </div>
    })

    // condensing the display options into functions for better readability
    function welcomeScreen () {
        return (
            <div className="startScreen">
                <h1>Welcome to Trivia!</h1>
                <h3>This is a general knowledge quiz with multiple choices.</h3>
                <button onClick={startGame}>Start game</button>
            </div>
        )
    }

    function questionBox () {
        return (
            <div className="questionsBox">
            <img className='blob1' src={blob1} alt='' />
            <img className='blob2' src={blob2} alt='' />
            <div> 
                {renderedQuestions}
            </div>
            <div className="buttons">
                {
                    gameState === "results" ?
                    <div className="scoreBox">

                    <div className="score">You scored {score}/{questions.length} correct answers</div>
                    <button onClick={resetGame}>Play Again</button>
                    </div>
                    :
                    <button onClick={checkAnswers}>Check Answers</button>
                }
            </div>
        </div> 
        )
    }

    // conditional redering using only 1 option
    let toDisplay = ""
    if (gameState === "welcome") {
        toDisplay = welcomeScreen()
    } else if (loading) {
        toDisplay = <LoadingScreen />
    } else {
        toDisplay = questionBox()
    }

    return (
        <main className="main">
            {score === 5 && <Confetti 
                  width={windowSize.width}
                  height={windowSize.height}
                  />
            }
            {toDisplay}
        </main>
    )
}



export default App;