import { db } from "../db.js";

export const getAlunos = (req, res) => {
    const sqlQuery = "SELECT * FROM alunos";
    db.query(sqlQuery, (err, result) => {
        const parsedResult = result.map(item => ({
            ...item,
            data_nascimento: new Date(item.data_nascimento).toLocaleDateString().slice(0, 6) + new Date(item.data_nascimento).toLocaleDateString().slice(8),
            horario_entrada: new Date(`01/01/2000 ${item.horario_entrada}`).toLocaleTimeString().slice(0, 5),
            horario_saida: new Date(`01/01/2000 ${item.horario_saida}`).toLocaleTimeString().slice(0, 5),
            cpf_mae: item.cpf_mae.slice(0, 3) + "." + item.cpf_mae.slice(3, 6) + "." + item.cpf_mae.slice(6, 9) + "-" + item.cpf_mae.slice(9, 11),
            cpf_pai: item.cpf_pai.slice(0, 3) + "." + item.cpf_pai.slice(3, 6) + "." + item.cpf_pai.slice(6, 9) + "-" + item.cpf_pai.slice(9, 11),
            telefone: "(" + item.telefone.slice(0, 2) + ") " + item.telefone.slice(2, 7) + "-" + item.telefone.slice(7, 11),
            data_inicio: new Date(item.data_inicio).toLocaleDateString().slice(0, 6) + new Date(item.data_inicio).toLocaleDateString().slice(8),
            valor_mensalidade: "R$ " + parseFloat(item.valor_mensalidade).toFixed(2).replace(".", ","),
            data_desligamento: item.data_desligamento ? new Date(item.data_desligamento).toLocaleDateString().slice(0, 6) + new Date(item.data_desligamento).toLocaleDateString().slice(8) : null,
        }));

        if (err) {
            return res.json(err);
        } else {
            res.status(200).json(parsedResult);
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
            return res.status(200).json(result.body);
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
            return res.status(200).json(result.body);
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