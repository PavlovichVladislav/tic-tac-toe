import React from "react";
import { useWS } from "../hooks/useWS.js";
import styles from "./Board.module.css";

const CloseButton = () => {
   const {ws, isWs} = useWS()

   function handleClick() {
      ws?.close();
   }

   return <button onClick={handleClick} disabled={!isWs} className={styles.btn}>Disconnect</button>;
};

export default CloseButton;
