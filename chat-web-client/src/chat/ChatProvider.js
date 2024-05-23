import {createContext, useEffect, useRef, useState} from "react";


export const ChatContext = createContext();

export const ChatProvider = ({children, serverUrl}) => {
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const joinChat = () => {
    if (username && username.length > 0) {
      setIsConnected(true);
      setUsername(username);
      if (!ws.current) {
        ws.current = new WebSocket(serverUrl);
        ws.current.onopen = () => {
          console.log("Connection was opened. Sending join message");
          const joinMessage = {
            type: "JOIN",
            username: username
          }
          ws.current.send(JSON.stringify(joinMessage));
        };
        ws.current.onclose = () => {
          console.log("Connection was closed")
          setIsConnected(false);
        };
        ws.current.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message) {
            console.log("Received message: ");
            console.log(message);
            setReceivedMessage(message);
          }
        }
      }
    }
  };

  const leaveChat = () => {
    setIsConnected(false);
  };

  const sendMessage = () => {
    if (ws.current) {
      const sendingMessage = {
        "text": messageText
      }
      ws.current.send(JSON.stringify(sendingMessage));
    }
  }

  useEffect(() => {
    if (!isConnected) {
      if (ws.current) {
        ws.current.close()
        ws.current = null;
      }
    }
  }, [isConnected]);

  useEffect(() => {
    if (receivedMessage) {
      const messagesCopy = messages.splice(0);
      messagesCopy.push(receivedMessage);
      setMessages(messagesCopy);
      setReceivedMessage(null);
    }
  }, [receivedMessage, messages])

  const chatInterface = {
    joinChat,
    leaveChat,
    sendMessage,
    isConnected,
    username,
    setUsername,
    messages,
    setMessageText
  };

  return (
      <ChatContext.Provider value={chatInterface}>
        {
          children
        }
      </ChatContext.Provider>
  )
};