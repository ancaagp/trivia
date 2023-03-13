import Question from "./components/Question";
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import decodeHTML from 'decode-html';
import blob1 from './images/blob1.svg';
import blob2 from './images/blob2.svg';
import './style.css';

// shuffle function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function App(){

    // base states
    let baseScore = 0;
    let baseUserAnswers = new Map([])
    let baseQuestions = []
    let baseGameState = "play"

    // states
    const [questions, setQuestions] = useState(baseQuestions);
    const [score, setScore] = useState(baseScore);
    const [userAnswers, setUserAnswers] = useState(baseUserAnswers)
    const [welcomeScreen, setWelcomeScreen] = useState(true)
    const [gameState, setGameState] = useState(baseGameState)
    const [answerColor, setAnswerColor] = useState("")
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    console.log(decodeHTML('&lt;div class="hidden"&gt;NON&amp;SENSE&apos;s&lt;/div&gt;'));

    // getting the data from the API
    const getData = () => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
        .then(res => res.json())
        .then(data => {
            // changing data object so it would have another property that joins all answer options
            let questions = data.results.map(question => {
                let answersArray = [...question.incorrect_answers];
                answersArray.push(question.correct_answer);
                shuffleArray(answersArray);

                let newQuestion = {
                    ...question,
                    all_answers: answersArray
                };
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
        setWelcomeScreen(prevState => !prevState)
    }

    const resetGame = () => {
        setQuestions(baseQuestions)
        setScore(baseScore);
        setUserAnswers(baseUserAnswers);
        setGameState(baseGameState)
        getData();
    }

    function updateUserAnswer(question, answer){
        setUserAnswers(oldUserAnswers => {
            const nextUserAnswers = new Map(oldUserAnswers);
            nextUserAnswers.set(question, answer)
            return nextUserAnswers;
        });
        questions.map(question =>{
        if (userAnswers.get(question.question === answer)){
            setAnswerColor("red")
        }
        })

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
                    // key={nanoid()}
                    id={nanoid()}
                    question={question.question}
                    correct_answer={question.correct_answer}
                    incorrect_answers={question.incorrect_answers}
                    all_answers={question.all_answers}
                    difficulty={question.difficulty}
                    updateUserAnswer={updateUserAnswer}
                    selectedAnswer={userAnswers.get(question.question)}
                    answerColor={answerColor}
                    gameState={gameState}
                />
            <hr
                // key={nanoid()}
                style={{
                    background: 'grey',
                    color: 'grey',
                    height: '2px',
                }}
            />
        </div>
    })


    return (
        <main className="main">
            {score === 5 && <Confetti 
                  width={windowSize.width}
                  height={windowSize.height}
                  />
            }
            {
                welcomeScreen ?
                <div className="startScreen">
                    <h1>Welcome to Trivia!</h1>
                    <h3>This is a general knowledge quiz with multiple choices.</h3>
                    <button onClick={startGame}>Start game</button>
                </div>
                :
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

                            <div className="score" style={{backgroundColor:"white"}}>You scored {score}/{questions.length} correct answers</div>
                            <button onClick={resetGame}>Play Again</button>
                            </div>
                            :
                            <button onClick={checkAnswers}>Check Answers</button>
                        }
                    </div>
                </div> 
            }
        </main>
    )
}

export default App;