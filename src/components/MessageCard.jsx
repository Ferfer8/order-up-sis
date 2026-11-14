import "./MessageCard.css"
function MessageCard({ header, text, height = "450px", width = "480px" }) {
    return (
        <div className="msg-cd" style={{ height, width }}>
            <p className="msg-cd-header">{header}</p>
            <p className="msg-cd-text">{text}</p>
            <span className="dashed-line"></span>
            <div className="course-list">
                <p className="course-num">1</p>
                <div className="course-item">
                    <p className="course-list-name">Appetizer</p>
                    <p className="course-list-text">Something light to start</p>
                </div>
            </div>
            <div className="course-list">
                <p className="course-num">2</p>
                <div className="course-item">
                    <p className="course-list-name">Main course</p>
                    <p className="course-list-text">The main dish</p>
                </div>
            </div>
            <div className="course-list">
                <p className="course-num">3</p>
                <div className="course-item">
                    <p className="course-list-name">Dessert</p>
                    <p className="course-list-text">Something sweet to finish</p>
                </div>
            </div>
        </div >
    )
}

export default MessageCard;