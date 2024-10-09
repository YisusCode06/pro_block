import express from "express";
import "dotenv/config"; //Para usar .env
import "./config/connectbd.js";
import path from 'path';
import { fileURLToPath } from 'url'; // Importamos fileURLToPath para manejar __dirname

//rutas
import routerUser from "./routes/users.route.js";
import routerTransaction from "./routes/transactions.route.js";
import routerProperty from "./routes/properties.route.js";
import routerContract from "./routes/contracts.route.js";
import routerDocument from "./routes/document.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Usar __dirname

//para cookies
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

//lamar rutas
app.use("/api/v1/user", routerUser);
app.use("/api/v1/transaction", routerTransaction);
app.use("/api/v1/property", routerProperty);
app.use("/api/v1/contract", routerContract);
app.use("/api/v1/document", routerDocument);

app.listen(PORT, () => {
  console.log("Running: " + PORT);
});
