import express from "express";
import alunosRoutes from "./routes/alunosRoutes.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/", alunosRoutes);

export default app;
