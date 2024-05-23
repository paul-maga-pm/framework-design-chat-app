import Koa from 'koa';
import WebSocket from 'ws';
import http from 'http';
import cors from 'koa-cors';
import { v4 as uuid4} from 'uuid';


const app = new Koa();
const server = http.createServer(app.callback());
const webSocketServer = new WebSocket.Server({ server });

app.use(cors());
server.listen(8080);

const broadcastMessage = (senderSession, message) => {
    message = {...message,
        sender: senderSession.username,
        sendByCurrentUser: false,
        timestamp: new Date()};
    const jsonMessage = JSON.stringify(message);
    webSocketServer.clients.forEach(receiverSession => {
        if (receiverSession.sessionId !== senderSession.sessionId) {
            receiverSession.send(jsonMessage);
        }
    });
}

webSocketServer.on('connection', session => {
    session.sessionId = uuid4();
    console.log("User connected! Session id = " + session.sessionId);
      session.on("message", event => {
          const message = JSON.parse(event);
          if (message) {
              if (message.type && message.type === "JOIN") {
                  session.username = message.username;
                  console.log("User joined! Session id = " + session.sessionId + " Username = " + session.username);
                  broadcastMessage(session, {type: "USER_JOINED"});
              } else {
                  const senderReply = {
                    sender: session.username,
                    sendByCurrentUser: true,
                    timestamp: new Date(),
                    text: message.text
                  };
                  session.send(JSON.stringify(senderReply));
                  broadcastMessage(session, message);
              }
          }

      });
      session.on("close", () => {
         console.log("User disconnected! Session id = " + session.sessionId);
         broadcastMessage(session, {type: "USER_LEFT"})
      });


});