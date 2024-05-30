function formatDate(dateStr) {
    const nowDate = new Date();
    const date = new Date(dateStr);
    if (nowDate.getMonth() === date.getMonth() && date.getDay() === nowDate.getDay()) {
        return date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"});
    } else {
        return date.toLocaleTimeString("en-US", {month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"});
    }
}

export const ChatMessage = ({message}) => {
    const userJoinedEventToComponent = (message) => {
        return (
            <div className="d-flex flex-row justify-content-center mb-4  align-items-center" >
                <span className="small mb-0">{formatDate(message.timestamp)}</span>
                <div className="p-3 ms-3" style={{borderRadius: "15px",
                    backgroundColor: "#fbfbfb"}}>
                    <p className="small mb-0">User {message.sender} joined!</p>
                </div>
            </div>

        )
    };

    const userLeftEventToComponent = (message) => {
        return (
            <div className="d-flex flex-row justify-content-center mb-4  align-items-center" >
                <span className="small mb-0">{formatDate(message.timestamp)}</span>
                <div className="p-3 ms-3" style={{borderRadius: "15px",
                    backgroundColor: "#fbfbfb"}}>
                    <p className="small mb-0">User {message.sender} left!</p>
                </div>
            </div>
        )
    };

    const messageEventToComponent = (message) => {
        return (
            <>
                {
                    !message.sendByCurrentUser &&
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <p className="small mb-0">{message.sender} at {formatDate(message.timestamp)}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                 alt="avatar 1" style={{width: "45px", height: "100%"}} />
                            <div className="p-3 ms-3" style={{borderRadius: "15px",
                                backgroundColor: "rgba(57, 192, 237,.2)"}}>
                                <p className="small mb-0">{message.text}</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    message.sendByCurrentUser &&
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <p className="small mb-0">You at {formatDate(message.timestamp)}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div className="p-3 me-3 border" style={{borderRadius: "15px"
                                , backgroundColor: "#fbfbfb"}}>
                                <p className="small mb-0">{message.text}</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                 alt="avatar 1" style={{width: "45px", height: "100%"}} />
                        </div>
                    </div>
                }
            </>

        )
    };

    const messageToComponent = (message) => {
        if (message.type) {
            if (message.type === "USER_JOINED") {
                return userJoinedEventToComponent(message);
            } else if (message.type === "USER_LEFT") {
                return userLeftEventToComponent(message);
            }
        }
        return messageEventToComponent(message);
    };

    return messageToComponent(message);
}