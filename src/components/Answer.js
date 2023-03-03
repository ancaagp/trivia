function Answer(props){
    //console.log(props.answer)
    const styles = {
        backgroundColor: (props.selectedAnswer === props.value) ? "blue" : ""
    }
    return <div 
                style={styles}
                onClick={() => props.selectAnswer(props.value)}>
                {props.value}
            </div>
}

export default Answer;