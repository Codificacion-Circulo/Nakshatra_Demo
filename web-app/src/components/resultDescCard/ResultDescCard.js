import Modal from "../modal/Modal"
import "./ResultDescCard.css"

const ResultDescCard = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <div className="resultDescCard__container">
                <p className="text-light">hello guys whatsup</p>
            </div>
            <button onClick={props.onClose}>close</button>
        </Modal>
    );
}

export default ResultDescCard;