import express from "express";
import alunosRoutes from "./routes/alunosRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://creche-conecta-2-0.vercel.app',
    credentials: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://creche-conecta-2-0.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    console.log("Request: " + req.method + " " + req.url);
    next();
});

app.use("/", alunosRoutes);

app.use("/hello", (req, res) => {
    res.send("Hello World!");
});

console.log("Server initialized")

export default app;
