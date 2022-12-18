import React from "react";
import { useWS } from "../hooks/useWS.js";

const CloseButton = () => {
   const {ws, isWs} = useWS()

   function handleClick() {
      ws?.close();
   }

   return <button onClick={handleClick} disabled={!isWs} >Close</button>;
};

export default CloseButton;
