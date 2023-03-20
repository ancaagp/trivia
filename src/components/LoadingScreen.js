import '../style.css';
import sloth from '../images/sloth_zootopia.jpeg'

function LoadingScreen () {
    return (
            <div className="loading">
                <img className='sloth' src = {sloth} alt="sloth zootopia"/>
            </div>
    )
}


export default LoadingScreen;