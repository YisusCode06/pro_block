import express from "express";
import "dotenv/config"; //Para usar .env
import "./config/connectbd.js";

//rutas
import routerUser from "./routes/users.route.js";
import routerTransaction from "./routes/transactions.route.js";
import routerProperty from "./routes/properties.route.js";
import routerContract from "./routes/contracts.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

//para cookies
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

//lamar rutas
app.use("/api/v1/user", routerUser)
app.use("/api/v1/transaction", routerTransaction);
app.use("/api/v1/property", routerProperty);
app.use("/api/v1/contract", routerContract);

app.listen(PORT, () => {
  console.log("Running: " + PORT);
});
