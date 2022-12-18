import React, { useRef } from "react";
import { WS } from "../api/ws";

const ConnectionButton = () => {
   const ws = useRef(WS.getInstance());

   function handleClick() {
      ws.current.connect();
   }

   return <button onClick={handleClick}>Connect</button>;
};

export default ConnectionButton;
