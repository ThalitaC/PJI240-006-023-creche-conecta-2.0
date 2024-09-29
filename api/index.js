import express from "express";
import alunosRoutes from "./routes/alunosRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", alunosRoutes);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});