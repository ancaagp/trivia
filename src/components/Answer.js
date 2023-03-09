function Answer(props){
    const styles = {
        backgroundColor: props.answerColor
        // backgroundColor: (props.selectedAnswer === props.value) ? "#D6DBF5" : ""
    }
    return <div className="answer"
                style={styles}
                onClick={() => props.selectAnswer(props.value)}>
                {props.value}
            </div>
}

export default Answer;