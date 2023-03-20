import '../style.css';
import { decodeHtml } from '../utils';

function Answer(props){
    let playState = props.gameState === "play";
    let resultsState = props.gameState === "results";
    let selectedAnswer = props.selectedAnswer === props.value;
    let correctAnswer = props.value === props.correct_answer;
    let extraClassName = "";

    // adding the relevant CSS class name to the answer
    if (playState && selectedAnswer) {
        extraClassName = "selected-answer";
    } else if (resultsState) {
        if (correctAnswer) {
            extraClassName = "correct-answer";
        } else if (selectedAnswer) {
            extraClassName = "incorrect-answer";
        } else {
            extraClassName = "other-answer";
        }  
    }

    return <div 
                className="answer"
                onClick={() => props.selectAnswer(props.value)} >
                <div 
                    className={"answerText " + extraClassName } >
                    {decodeHtml(props.value)}
                </div>
            </div>
}

export default Answer;