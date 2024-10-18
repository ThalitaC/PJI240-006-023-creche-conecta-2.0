import express from "express";
import router from "./routes/alunosRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Request: " + req.method + " " + req.url);
    next();
});

app.use("/", router);

console.log("Server initialized")

export default app;
