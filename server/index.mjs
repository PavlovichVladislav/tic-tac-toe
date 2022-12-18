import { createServer } from "http";
import { createServer as createSocketServer } from "sockjs";
import { Board } from "./lib/board.mjs";

const httpServer = createServer();
const socketServer = createSocketServer();

let poolClients = [];

socketServer.on("connection", (connection) => {
   poolClients = [...poolClients, connection];

   connection.on("close", () => {
      poolClients = poolClients.filter((clinet) => clinet !== connection);
   });

   connection.on("data", (msg) => {
      try {
         const parseData = JSON.parse(msg);
         switch (parseData.type) {
            case "ping":
               handlePing(connection);
               break;
            case "firstStep":
               handleFirstStep(connection, parseData.payload);
               break;
            case "step":
               handleStep(connection, parseData.payload);
               break;
            case "clearBoard":
               handleClearBoard();
               break;
            case "getBoardState":
               handleGetBoardState(connection);
               break;
            default:
               handleDefault(connection);
               break;
         }
      } catch (e) {
         console.log(e);
      }
   });
});

socketServer.installHandlers(httpServer);

httpServer.listen(5000);

function handlePing(connection) {
   connection.write(JSON.stringify({ type: "pong" }));
}

function handleDefault(connection) {
   connection.write(JSON.stringify({ type: "unknown type of message" }));
}

function handleFirstStep(connection, payload) {
   const board = Board.getInstance();

   const { result } = board?.firstStep(payload);

   const boardState = board?.getGameState();

   if (result) {
      const message = JSON.stringify({ 
         type: "first step is happen",
         payload: boardState,
      });

      poolClients.forEach((connection) => connection.write(message));
   } else {
      const message = JSON.stringify({
         type: "step is failed",
         payload: boardState,
      });
      connection.write(message);
   }
}

function handleStep(connection, payload) {
   const board = Board.getInstance();

   const { result } = board?.step(payload);

   const boardState = board?.getGameState();

   if (result) {
      const message = JSON.stringify({
         type: "step is happen",
         payload: boardState,
      });

      poolClients.forEach((connection) => connection.write(message));
   } else {
      const message = JSON.stringify({
         type: "step is failed",
         payload: boardState,
      });
      connection.write(message);
   }
}

function handleClearBoard() {
   const board = Board.getInstance();

   board?.clear();

   const message = JSON.stringify({
      type: "map is cleared",
      payload: board?.getGameState(),
   });
   poolClients.forEach((connection) => connection.write(message));
}

function handleGetBoardState(connection) {
   const board = Board.getInstance();

   connection.write(
      JSON.stringify({ type: "boardState", payload: board?.getGameState() })
   );
}
