import Question from "./components/Question";
import './style.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

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

    // states
    const [questions, setQuestions] = useState(baseQuestions);
    const [score, setScore] = useState(baseScore);
    const [userAnswers, setUserAnswers] = useState(baseUserAnswers)
    const [welcomeScreen, setWelcomeScreen] = useState(true)


    const getData = () => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple&")
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

    useEffect(() => {
        getData();
      },[])
    

    const resetGame = () => {
        setQuestions(baseQuestions)
        setScore(baseScore);
        setUserAnswers(baseUserAnswers);
        getData();
    }

    // function getData() {
    //     useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple&")
    //         .then(res => res.json())
    //         .then(data => {
    //             // changing data object so it would have another property that joins all answer options
    //             let questions = data.results.map(question => {
    //                 let answersArray = [...question.incorrect_answers];
    //                 answersArray.push(question.correct_answer);
    //                 shuffleArray(answersArray);

    //                 let newQuestion = {
    //                     ...question,
    //                     all_answers: answersArray
    //                 };
    //                 return newQuestion;
    //             });
    //             setQuestions(questions);
    //         })

    // },[])};

    // console.log(userAnswers);

    function updateUserAnswer(question, answer){
        setUserAnswers(oldUserAnswers => {
            const nextUserAnswers = new Map(oldUserAnswers);
            nextUserAnswers.set(question, answer)
            return nextUserAnswers;
        });
    }

    function checkAnswers(){
        let newScore = 0;
        questions.map(question => {
            console.log(question.correct_answer)
            let userAnswer = userAnswers.get(question.question);
            if (userAnswer === question.correct_answer){
                newScore ++
            }
        })
        setScore(newScore);
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
                    // checkAnswers={checkAnswers}
                    updateUserAnswer={updateUserAnswer}
                    selectedAnswer={userAnswers.get(question.question)}
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

    const startGame = () => {
        setWelcomeScreen(prevState => !prevState)
    }

    // useEffect(() => {
    //     async function getQuiz() {
    //         console.log('fetching');
    //         const url = "https://opentdb.com/api.php?amount=5&category=9";
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         return json.results;
    //     }
    //     getQuiz()
    // },[])

    // useEffect(async () => {
    //     const res = await fetch("https://opentdb.com/api.php?amount=5&category=9");
    //     const data = await res.json();
    //     setQuestions(data)
    //     console.log(data)
    // },[])

    return (
        <main className="main">
            {
                welcomeScreen ?
                <button onClick={startGame}>Start game</button> :
                <div>
                <div>
                    {renderedQuestions}
                </div>
                <div className="score" style={{backgroundColor:"white"}}>You scored {score}/{questions.length} correct answers</div>
                <button onClick={checkAnswers}>Check Answers</button>
                <button onClick={resetGame}>Play Again</button>
            </div> 
            }
        </main>
    )
}

export default App;