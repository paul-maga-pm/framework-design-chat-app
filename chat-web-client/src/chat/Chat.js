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
                Connect to chat
                <input type={"text"} value={username} onInput={e => {
                    setUsername(e.target.value);
                }}/>
                <input type={"button"} value={"Join"} onClick={() => {
                    joinChat();
                }} />
            </div>
        )
    }



    return (
        <div>
            This is the chat
            <input type={"button"} value={"Leave"} onClick={() => {
                leaveChat();
            }}/>
            {
                messages.map(message =>
                    <ChatMessage message={message} key={id}/>
                )
            }
            <input type={"text"}  onInput={e => {
                if (e.target.value) {
                    setMessageText(e.target.value)
                }
            } }/>
            <input type={"button"} value={"Send"} onClick={() => {
                sendMessage();
            }}/>
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