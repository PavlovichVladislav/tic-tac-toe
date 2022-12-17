import { useRef } from 'react';
import SockJsClient from 'sockjs-client';
import { SOCKET_SERVER } from './constants';
import './App.css';

function App() {
  const wsConn = useRef(new SockJsClient(SOCKET_SERVER));

  const handleClick = () => {
    if (wsConn.current && wsConn.current.readyState === 1) {
      wsConn.current.send(JSON.stringify({type: 'ping'}))
    }
  }

  return (
    <div className="App">
      <button onClick={handleClick}>ping</button>
    </div>
  );
}

export default App;
