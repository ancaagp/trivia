function Answer(props){
    console.log(props.answer)
    const styles = {
        backgroundColor: (props.answer.isSelected && props.answer.value === props.value) ? "blue" : "white"
    }
    return <div 
                style={styles}
                onClick={() => props.selectAnswer(props.value)}>
                {props.value}
            </div>
}

export default Answer;