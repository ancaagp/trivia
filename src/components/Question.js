import '../style.css';
import { nanoid } from 'nanoid';
import Answer from './Answer';

function Question(props) {
    const selectAnswer = (answer) => {
        props.updateUserAnswer(props.question, answer);
    };

    const renderedAnswers = props.all_answers.map(option => {
        return ( 
            <Answer 
                key={nanoid()} 
                question_id={props.id}
                value={option}
                selectAnswer={selectAnswer}
                correct_answer={props.correct_answer}
                selectedAnswer={props.selectedAnswer}
                gameState={props.gameState}
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