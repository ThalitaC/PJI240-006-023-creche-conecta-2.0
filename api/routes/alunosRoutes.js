import express  from "express";
import {addAluno, deleteAluno, getAlunos, updateAluno} from "../controller/alunosController.js";

const router = express.Router();

router.get("/", getAlunos);

router.post("/", addAluno);

router.put("/:id", updateAluno);

router.delete("/:id", deleteAluno);

export default router;