import { createServer } from "http";
import { createServer as createSocketServer } from "sockjs";

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
            case "ping": {
               connection.write("pong");
               break;
            }
            default: {
               connection.write("unknown type of message");
            }
         }
      } catch (e) {
         console.log(e);
      }
   });
});

socketServer.installHandlers(httpServer);

httpServer.listen(5000);
