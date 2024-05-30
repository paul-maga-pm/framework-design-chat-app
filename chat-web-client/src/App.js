import './App.css';
import {Chat} from "./chat/Chat";

function App() {
  return (
     <Chat serverUrl={"ws://localhost:8080"}/>
  );
}

export default App;
