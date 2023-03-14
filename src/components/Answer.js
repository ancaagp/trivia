import '../style.css';
import { decodeHtml } from '../utils';

function Answer(props){
    let styles = ""
    if (props.gameState === "play"){
        styles = {
            backgroundColor: (props.selectedAnswer === props.value) ? "#dda15e" : ""}
    } else if (props.gameState === "results") {
        let backgroundColor = "";
        let color = "";
        if (props.selectedAnswer === props.value && props.value === props.correct_answer) {
            backgroundColor = "#ccd5ae";
        } else if (props.selectedAnswer === props.value && props.value !== props.correct_answer) {
            backgroundColor = "#ffb4a2";
        } else if (props.selectedAnswer !== props.value && props.value === props.correct_answer) {
            backgroundColor = "#ccd5ae";
        } else {
            color = "grey";
        }
        styles = {backgroundColor, color};
    }
    
    return <div className="answer"
                style={styles}
                onClick={() => props.selectAnswer(props.value)}
            >
                {decodeHtml(props.value)}
            </div>
}

export default Answer;