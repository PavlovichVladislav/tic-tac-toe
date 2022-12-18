import React from "react";
import { useWS } from "../hooks/useWS.js";

const PingButton = () => {
    const {ws, isWs} = useWS();

   function handleClick() {
      ws?.send(JSON.stringify({type: "ping"}));
   }

   return <button onClick={handleClick} disabled={!isWs}>Ping</button>;
};

export default PingButton;
