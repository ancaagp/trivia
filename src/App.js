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
    const [questions, setQuestions] = useState([]);

    const [score, setScore] = useState(0);

    const [userAnswers, setUserAnswers] = useState(new Map([]))


    useEffect(() => {
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
            })

    },[]);

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
        return <Question 
                    key={nanoid()}
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
    })


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
        <main>
            {
                questions.length > 0
                ?
                <div>
                    <div>
                        {renderedQuestions}
                    </div>
                    {/* <button onClick={checkAnswers}>Check answers</button> */}
                </div>

                :
                <div>
                    Start game
                </div>
            }
            <div style={{backgroundColor:"white"}}>Your score is {score}/{questions.length}</div>
            <button onClick={checkAnswers}>Check Answers</button>
        </main>
    )
}

export default App;