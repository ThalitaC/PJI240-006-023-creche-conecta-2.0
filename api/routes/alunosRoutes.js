import express  from "express";
import { getAlunos } from "../controller/alunosController.js";

const router = express.Router();

router.get("/", getAlunos);

export default router;