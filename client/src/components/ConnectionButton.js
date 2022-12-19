import React from "react";
import { useWS } from "../hooks/useWS.js";
import styles from "./Board.module.css";

const ConnectionButton = () => {
   const {ws, isWs} = useWS();

   function handleClick() {
      ws?.connect();
   }

   return <button onClick={handleClick} disabled={isWs} className={styles.btn}>Connect</button>;
};

export default ConnectionButton;
