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

    const [questionStatus, setQuestionStatus] = useState()


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

    console.log(questions);

    // function checkAnswers(score_number){
    //     let new_score = 0;
    //     new_score +=score_number;
    //     setScore(new_score);
    // }

    console.log(`score is ${score}`);

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
        </main>
    )
}

export default App;