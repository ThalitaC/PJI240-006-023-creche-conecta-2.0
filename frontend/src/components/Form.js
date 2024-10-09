import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getAlunos, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {

            const aluno = ref.current;

            aluno.nome_aluno.value = onEdit.nome_aluno;
            aluno.data_nascimento.value = new Date(onEdit.data_nascimento).toISOString().split('T')[0];
            aluno.horario_entrada.value = onEdit.horario_entrada;
            aluno.horario_saida.value = onEdit.horario_saida;
            aluno.nome_mae.value = onEdit.nome_mae;
            aluno.cpf_mae.value = onEdit.cpf_mae;
            aluno.nome_pai.value = onEdit.nome_pai;
            aluno.cpf_pai.value = onEdit.cpf_pai;
            aluno.endereco.value = onEdit.endereco;
            aluno.telefone.value = onEdit.telefone;
            aluno.data_inicio.value = new Date(onEdit.data_inicio).toISOString().split('T')[0];
            aluno.valor_mensalidade.value = onEdit.valor_mensalidade;
            aluno.data_desligamento.value = onEdit.data_desligamento;
        }
    }, [onEdit]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const aluno = ref.current;

        if (
            !aluno.nome_aluno.value ||
            !aluno.data_nascimento.value ||
            !aluno.horario_entrada.value ||
            !aluno.horario_saida.value ||
            !aluno.nome_mae.value ||
            !aluno.cpf_mae.value ||
            !aluno.nome_pai.value ||
            !aluno.cpf_pai.value ||
            !aluno.endereco.value ||
            !aluno.telefone.value ||
            !aluno.data_inicio.value ||
            !aluno.valor_mensalidade.value
        ) {
            return toast.warn("Preencha todos os campos obrigatórios!");
        }

        if (onEdit) {

            const updatedData = {
                nome_aluno: aluno.nome_aluno.value,
                data_nascimento: aluno.data_nascimento.value,
                horario_entrada: aluno.horario_entrada.value,
                horario_saida: aluno.horario_saida.value,
                nome_mae: aluno.nome_mae.value,
                cpf_mae: aluno.cpf_mae.value,
                nome_pai: aluno.nome_pai.value,
                cpf_pai: aluno.cpf_pai.value,
                endereco: aluno.endereco.value,
                telefone: aluno.telefone.value,
                data_inicio: aluno.data_inicio.value,
                valor_mensalidade: aluno.valor_mensalidade.value,
                data_desligamento: aluno.data_desligamento.value,
            };

            await axios
                .put(`http://localhost:8000/${onEdit.id}`, updatedData)
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8000", {
                    nome_aluno: aluno.nome_aluno.value,
                    data_nascimento: aluno.data_nascimento.value,
                    horario_entrada: aluno.horario_entrada.value,
                    horario_saida: aluno.horario_saida.value,
                    nome_mae: aluno.nome_mae.value,
                    cpf_mae: aluno.cpf_mae.value,
                    nome_pai: aluno.nome_pai.value,
                    cpf_pai: aluno.cpf_pai.value,
                    endereco: aluno.endereco.value,
                    telefone: aluno.telefone.value,
                    data_inicio: aluno.data_inicio.value,
                    valor_mensalidade: aluno.valor_mensalidade.value,
                    data_desligamento: aluno.data_desligamento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        aluno.nome_aluno.value = "";
        aluno.data_nascimento.value = "";
        aluno.horario_entrada.value = "";
        aluno.horario_saida.value = "";
        aluno.nome_mae.value = "";
        aluno.cpf_mae.value = "";
        aluno.nome_pai.value = "";
        aluno.cpf_pai.value = "";
        aluno.endereco.value = "";
        aluno.telefone.value = "";
        aluno.data_inicio.value = "";
        aluno.valor_mensalidade.value = "";
        aluno.data_desligamento.value = "";

        setOnEdit(null);
        getAlunos();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome do aluno</Label>
                <Input name="nome_aluno" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>
            <InputArea>
                <Label>Horário de Entrada</Label>
                <Input name="horario_entrada" type="time" />
            </InputArea>
            <InputArea>
                <Label>Horário de Saída</Label>
                <Input name="horario_saida" type="time" />
            </InputArea>
            <InputArea>
                <Label>Nome da Mãe</Label>
                <Input name="nome_mae" />
            </InputArea>
            <InputArea>
                <Label>CPF da Mãe</Label>
                <Input name="cpf_mae" />
            </InputArea>
            <InputArea>
                <Label>Nome do Pai</Label>
                <Input name="nome_pai" />
            </InputArea>
            <InputArea>
                <Label>CPF do Pai</Label>
                <Input name="cpf_pai" />
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input name="endereco" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="telefone" />
            </InputArea>
            <InputArea>
                <Label>Data de Início</Label>
                <Input name="data_inicio" type="date" />
            </InputArea>
            <InputArea>
                <Label>Valor da mensalidade</Label>
                <Input name="valor_mensalidade" type="number" />
            </InputArea>
            <InputArea>
                <Label>Data de Desligamento</Label>
                <Input name="data_desligamento" type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
