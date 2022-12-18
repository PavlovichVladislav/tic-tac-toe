import styles from "./Board.module.css";

import { useBoard } from "../hooks/useBoard";

export function Board() {
   const { map, handleClear, handleStep } = useBoard();
   
   return (
      <>
         <div className={styles.control}>
            <button className={styles.clear} onClick={handleClear}>
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
      </>
   );
}

export default Board;
