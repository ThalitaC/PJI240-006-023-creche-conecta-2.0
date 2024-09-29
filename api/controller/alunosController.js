import { db } from "../db.js";

export const getAlunos = (req, res) => {
    const sqlQuery = "SELECT * FROM alunos";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            res.status(200).json(result);
        }
    });
}