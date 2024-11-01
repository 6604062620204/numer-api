import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { swaggerSpec, swaggerUi } from "./config/swaggerConfig.js";
import rootRouter from "./routers/root.js";
import linearRouter from "./routers/linear.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", rootRouter);
app.use("/api", linearRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3030, () => {
  console.log("CORS-enabled web server listening on port 3030");
});
