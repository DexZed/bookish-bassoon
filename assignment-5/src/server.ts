import App from "./app.js";
import validatedConfig, { MONGO_URI } from "./config/validate";
import { MongoConnection } from "./db/mongo-connection";
import { ExceptionHandler } from "./utils/exceptionsHandler";

ExceptionHandler.init();

MongoConnection.getInstance().connect(MONGO_URI);
MongoConnection.getInstance().connectionStatus();
const PORT = validatedConfig.PORT;
const server = new App(PORT);
server.initServer();
