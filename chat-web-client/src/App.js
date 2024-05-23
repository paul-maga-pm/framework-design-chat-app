import './App.css';
import {Chat} from "./chat/Chat";

function App() {
  return (
     <Chat serverUrl={"ws://192.168.1.134:8080"}/>
  );
}

export default App;
