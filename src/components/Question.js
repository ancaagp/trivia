import '../style.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Answer from './Answer';

function Question(props) {

    const [answer, setAnswer] = useState([]);

    // let score = 0;
    // answer.isCorrect ? score = 1 : score = 0;

    // function handleChange(){
    //     props.checkAnswers(score);
    // }

    const selectAnswer = (answer) => {
        setAnswer({
            value: answer,
            isSelected: true,
            isCorrect: answer === props.correct_answer
        });
        // handleChange();
    };

    const renderedAnswers = props.all_answers.map(option => {
        return ( 
            <Answer 
                key={nanoid()} 
                question_id={props.id}
                value={option}
                selectAnswer={selectAnswer}
                answer={answer}
            />
        )
    })

    return (
            <div className="question-box">
                <div className="question">{props.question}</div>
                <div 
                    className="answers-box">
                    {renderedAnswers}
                </div>
            </div>
    )
}


export default Question;