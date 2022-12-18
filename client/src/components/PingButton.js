import React, { useRef } from "react";
import { WS } from "../api/ws";

const PingButton = () => {
   const ws = useRef(WS.getInstance());

   function handleClick() {
      ws.current.send(JSON.stringify({type: "ping"}));
   }

   return <button onClick={handleClick} disabled={!ws.current.isWsReady}>Ping</button>;
};

export default PingButton;
