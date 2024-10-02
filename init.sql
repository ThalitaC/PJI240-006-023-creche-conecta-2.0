CREATE DATABASE IF NOT EXISTS `creche-conecta`;

USE `creche-conecta`;

CREATE TABLE IF NOT EXISTS alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_aluno VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    horario_entrada TIME NOT NULL,
    horario_saida TIME NOT NULL,
    nome_mae VARCHAR(50) NOT NULL,
    cpf_mae VARCHAR(20) NOT NULL,
    nome_pai VARCHAR(50),
    cpf_pai VARCHAR(20),
    endereco VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    data_inicio DATE NOT NULL,
    valor_mensalidade DECIMAL(10, 2) NOT NULL,
    data_desligamento DATE
);