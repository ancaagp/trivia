import '../style.css';
import decodeHTML from 'decode-html';

function Answer(props){
    let styles = ""
    if (props.gameState === "play"){
        styles = {
            backgroundColor: (props.selectedAnswer === props.value) ? "#D6DBF5" : ""}
    } else if (props.gameState === "results") {
        let backgroundColor = "";
        let color = "";
        if (props.selectedAnswer === props.value && props.value === props.correct_answer) {
            backgroundColor = "#94D7A2";
        } else if (props.selectedAnswer === props.value && props.value !== props.correct_answer) {
            backgroundColor = "#F8BCBC";
        } else if (props.selectedAnswer !== props.value && props.value === props.correct_answer) {
            backgroundColor = "#94D7A2";
        } else {
            color = "grey";
        }
        styles = {backgroundColor, color};
    }
    
    return <div className="answer"
                style={styles}
                onClick={() => props.selectAnswer(props.value)}
            >
                {props.value}
            </div>
}

export default Answer;