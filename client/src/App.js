import "./App.css";
import CloseButton from "./components/CloseButton";
import ConnectionButton from "./components/ConnectionButton";
import PingButton from "./components/PingButton";

function App() {
   return (
      <div className="App">
        <ConnectionButton/>
        <PingButton/>
        <CloseButton/>
      </div>
   );
}

export default App;
