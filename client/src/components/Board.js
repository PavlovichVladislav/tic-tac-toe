import styles from "./Board.module.css";
import ConnectionButton from "./ConnectionButton";
import CloseButton from "./CloseButton";

import { useBoard } from "../hooks/useBoard";

export function Board() {
   const { map, handleClear, handleStep } = useBoard();

   return (
      <div>
         <div className={styles.control}>
            <ConnectionButton />
            <CloseButton />
            <button className={styles.btn} onClick={handleClear}>
               Clear
            </button>
         </div>
         <div className="container">
            <ul className={styles.map}>
               {map &&
                  map.map((field, idx) => (
                     <li
                        key={idx}
                        className={styles.cell}
                        onClick={() => handleStep(idx)}
                     >
                        {field}
                     </li>
                  ))}
            </ul>
         </div>
      </div>
   );
}

export default Board;
