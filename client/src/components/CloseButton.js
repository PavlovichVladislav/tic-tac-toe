import React, { useRef } from "react";
import { WS } from "../api/ws";

const CloseButton = () => {
   const ws = useRef(WS.getInstance());

   function handleClick() {
      ws.current.close();
   }

   return <button onClick={handleClick}>Close</button>;
};

export default CloseButton;
