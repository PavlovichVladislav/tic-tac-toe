import "./App.css";
import CloseButton from "./components/CloseButton";
import ConnectionButton from "./components/ConnectionButton";
import PingButton from "./components/PingButton";
import Board from "./components/Board";

function App() {
   return (
      <>
        <ConnectionButton/>
        <PingButton/>
        <CloseButton/>
        <Board/>
      </>
   );
}

export default App;
