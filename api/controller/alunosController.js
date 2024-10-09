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
};

export const addAluno = (req, res) => {
    const sqlQuery = "INSERT INTO alunos (`nome_aluno`, `data_nascimento`, `horario_entrada`, `horario_saida`, `nome_mae`, `cpf_mae`, `nome_pai`, `cpf_pai`, `endereco`, `telefone`, `data_inicio`, `valor_mensalidade`, `data_desligamento`) VALUES (?)";

    const values = [
        req.body.nome_aluno,
        req.body.data_nascimento,
        req.body.horario_entrada,
        req.body.horario_saida,
        req.body.nome_mae,
        req.body.cpf_mae,
        req.body.nome_pai || null,
        req.body.cpf_pai || null,
        req.body.endereco,
        req.body.telefone,
        req.body.data_inicio,
        req.body.valor_mensalidade,
        req.body.data_desligamento || null,
    ];

    db.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(200).json("Aluno adicionado com sucesso!");
        }
    });
};

export const updateAluno = (req, res) => {
    const sqlQuery = "UPDATE alunos SET `nome_aluno` = COALESCE(?, nome_aluno), `data_nascimento` = COALESCE(?, data_nascimento), `horario_entrada` = COALESCE(?, horario_entrada), `horario_saida` = COALESCE(?, horario_saida), `nome_mae` = COALESCE(?, nome_mae), `cpf_mae` = COALESCE(?, cpf_mae), `nome_pai` = COALESCE(?, nome_pai), `cpf_pai` = COALESCE(?, cpf_pai), `endereco` = COALESCE(?, endereco), `telefone` = COALESCE(?, telefone), `data_inicio` = COALESCE(?, data_inicio), `valor_mensalidade` = COALESCE(?, valor_mensalidade), `data_desligamento` = COALESCE(?, data_desligamento) WHERE id = ?";
    const values = [
        req.body.nome_aluno,
        req.body.data_nascimento,
        req.body.horario_entrada,
        req.body.horario_saida,
        req.body.nome_mae,
        req.body.cpf_mae,
        req.body.nome_pai,
        req.body.cpf_pai,
        req.body.endereco,
        req.body.telefone,
        req.body.data_inicio,
        req.body.valor_mensalidade,
        req.body.data_desligamento || null,
    ];

    db.query(sqlQuery, [...values, req.params.id], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(200).json("Aluno atualizado com sucesso!");
        }
    });
};

export const deleteAluno = (req, res) => {
    const sqlQuery = "DELETE FROM alunos WHERE id = ?";

    db.query(sqlQuery, [req.params.id], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(200).json("Aluno deletado com sucesso!");
        }
    });
};