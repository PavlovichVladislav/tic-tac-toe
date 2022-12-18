import React from "react";
import { useWS } from "../hooks/useWS.js";

const ConnectionButton = () => {
   const {ws, isWs} = useWS();

   function handleClick() {
      ws?.connect();
   }

   return <button onClick={handleClick} disabled={isWs}>Connect</button>;
};

export default ConnectionButton;
