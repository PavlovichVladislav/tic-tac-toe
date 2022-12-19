import { createServer } from "http";
import { createServer as createSocketServer } from "sockjs";

import { Board } from "./board.mjs";

const httpServer = createServer();
const socketServer = createSocketServer();

let poolClient = [];

socketServer.on("connection", (connection) => {
   poolClient = [...poolClient, connection];

   connection.on("close", () => {
      poolClient = poolClient.filter((c) => c !== connection);
   });

   connection.on("data", (msg) => {
      try {
         const parsedData = JSON.parse(msg);
         switch (parsedData.type) {
            case "firstStep":
               handleFirstStep(connection, parsedData.payload);
               break;
            case "step":
               handleStep(connection, parsedData.payload);
               break;
            case "clearBoard":
               handleClear();
               break;
            case "getBoardState":
               handleGetBoardState(connection);
               break;
            default:
               handleDefault(connection);
         }
      } catch (e) {
         console.log(e);
      }
   });
});

socketServer.installHandlers(httpServer);

httpServer.listen(5000);

function handleDefault(connection) {
   connection.write(JSON.stringify({ type: "UNKNOWN" }));
}

function handleFirstStep(connection, payload) {
   const board = Board.getInstance();

   const { result } = board?.firstStep(payload);

   const boardStatus = board?.getCurrentGameState();

   if (result) {
      const message = JSON.stringify({
         type: "first step is happen",
         payload: boardStatus,
      });
      poolClient.forEach((conn) => conn.write(message));
   } else {
      const message = JSON.stringify({
         type: "first step is failed",
         payload: boardStatus,
      });
      connection.write(message);
   }
}

function handleStep(connection, payload) {
   const board = Board.getInstance();

   const { result } = board?.step(payload);

   const boardStatus = board?.getCurrentGameState();

   if (result) {
      const message = JSON.stringify({
         type: "step is happen",
         payload: boardStatus,
      });
      poolClient.forEach((conn) => conn.write(message));
   } else {
      const message = JSON.stringify({
         type: "step is failed",
         payload: boardStatus,
      });
      connection.write(message);
   }
}

function handleClear() {
   const board = Board.getInstance();

   board?.clear();

   const message = JSON.stringify({
      type: "map is cleared",
      payload: board?.getCurrentGameState(),
   });

   poolClient.forEach((connection) => connection.write(message));
}

function handleGetBoardState(connection) {
   const board = Board.getInstance();

   connection.write(
      JSON.stringify({
         type: "board state",
         payload: board?.getCurrentGameState(),
      })
   );
}
