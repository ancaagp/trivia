import '../style.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Answer from './Answer';

function Question(props) {

    const [answer, setAnswer] = useState([]);

    const selectAnswer = (answer) => {
        props.updateUserAnswer(props.question, answer);
        // let isCorrect = answer === props.correct_answer; 
        
        // if (isCorrect) {
        //     props.checkAnswers(1);
        // }

        // setAnswer({
        //     value: answer,
        //     isSelected: true,
        //     isCorrect: isCorrect
        // });
    };

    const renderedAnswers = props.all_answers.map(option => {
        return ( 
            <Answer 
                key={nanoid()} 
                question_id={props.id}
                value={option}
                selectAnswer={selectAnswer}
                answer={answer}
                selectedAnswer={props.selectedAnswer}
                answerColor={props.answerColor}
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