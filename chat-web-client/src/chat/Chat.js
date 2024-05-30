import {useContext, useId} from "react";
import {ChatContext, ChatProvider} from "./ChatProvider";
import {ChatMessage} from "./ChatMessage";

const ChatComponent = () => {
    const id = useId();
    const {sendMessage,
        joinChat,
        leaveChat,
        isConnected,
        username,
        setUsername,
        messages,
        setMessageText} = useContext(ChatContext);

    if (!isConnected) {
        return (
            <div>
                <div className="container py-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-4">
                            <div className="card" id="chat1" style={{borderRadius: "15px"}}>
                                <div
                                    className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                                    style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}>
                                    <i className="fas fa-angle-left"/>
                                    <p className="mb-0 fw-bold">Connect to chat</p>
                                    <i className="fas fa-times"/>
                                </div>

                                <div className="text-center form-group">
                                    <input type={"text"} value={username} onInput={e => {
                                        setUsername(e.target.value);
                                    }}
                                        className="form-control"
                                    />
                                    <input type={"button"} value={"Join"} onClick={() => {
                                        joinChat();
                                    }}
                                        className="btn btn-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }



    return (
        <div>
            <div className="container py-5">

                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-4">

                        <div className="card" id="chat1" style={{borderRadius: "15px"}}>
                            <div
                                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                                style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}>
                                <i className="fas fa-angle-left"/>
                                <p className="mb-0 fw-bold">This is the chat</p>
                                <i className="fas fa-times"/>
                                <input type={"button"} value={"Leave"} onClick={() => {
                                    leaveChat();
                                }}
                                    className="btn btn-secondary"
                                />
                            </div>
                                <div className="card-body">
                                {
                                    messages.map(message =>
                                        <ChatMessage message={message} key={id}/>
                                    )
                                }
                                    <div  className="form-outline">
                                        <textarea className="form-control" id="textAreaExample" rows="4"
                                            onInput={e => {
                                                if (e.target.value) {
                                                    setMessageText(e.target.value)
                                                }
                                            }}
                                        />
                                        <div className="text-center">
                                            <input type={"button"} value={"Send"}
                                                   className="btn btn-primary"
                                                   onClick={() => {
                                                       sendMessage();
                                                   }}/>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export const Chat = ({serverUrl}) => {
    return (
        <ChatProvider serverUrl={serverUrl}>
            <ChatComponent />
        </ChatProvider>
    )
}