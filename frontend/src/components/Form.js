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

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    useEffect(() => {
        if (onEdit) {

            const aluno = ref.current;

            aluno.nome_aluno.value = onEdit.nome_aluno;
            aluno.data_nascimento.value = parseDate(onEdit.data_nascimento);
            aluno.horario_entrada.value = onEdit.horario_entrada;
            aluno.horario_saida.value = onEdit.horario_saida;
            aluno.nome_mae.value = onEdit.nome_mae;
            aluno.cpf_mae.value = onEdit.cpf_mae.replace(/\D/g,'');
            aluno.nome_pai.value = onEdit.nome_pai;
            aluno.cpf_pai.value = onEdit.cpf_pai.replace(/\D/g,'');
            aluno.endereco.value = onEdit.endereco;
            aluno.telefone.value = onEdit.telefone.replace(/\D/g,'');
            aluno.data_inicio.value = parseDate(onEdit.data_inicio);
            aluno.valor_mensalidade.value = parseFloat(onEdit.valor_mensalidade.replace(/[^\d,-]/g, ''));

            if (onEdit.data_desligamento === null) {
                aluno.data_desligamento.value = null;
            } else {
                aluno.data_desligamento.value = parseDate(onEdit.data_desligamento);
            }
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
                data_desligamento: aluno.data_desligamento.value === "" ? null : aluno.data_desligamento.value,
            };

            await axios
                .put(process.env.REACT_APP_URL + `/${onEdit.id}`, updatedData)
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post(process.env.REACT_APP_URL, {
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
                    data_desligamento: aluno.data_desligamento.value === "" ? null : aluno.data_desligamento.value,
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
                <Label htmlFor="nome_aluno">Nome do aluno</Label>
                <Input name="nome_aluno" id="nome_aluno" />
            </InputArea>
            <InputArea>
                <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                <Input name="data_nascimento" id="data_nascimento" type="date" />
            </InputArea>
            <InputArea>
                <Label htmlFor="horario_entrada">Horário de Entrada</Label>
                <Input name="horario_entrada" id="horario_entrada" type="time" />
            </InputArea>
            <InputArea>
                <Label htmlFor="horario_saida">Horário de Saída</Label>
                <Input name="horario_saida" id="horario_saida" type="time" />
            </InputArea>
            <InputArea>
                <Label htmlFor="nome_mae">Nome da Mãe</Label>
                <Input name="nome_mae" id="nome_mae" />
            </InputArea>
            <InputArea>
                <Label htmlFor="cpf_mae">CPF da Mãe</Label>
                <Input name="cpf_mae" id="cpf_mae" />
            </InputArea>
            <InputArea>
                <Label htmlFor="nome_pai">Nome do Pai</Label>
                <Input name="nome_pai" id="nome_pai" />
            </InputArea>
            <InputArea>
                <Label htmlFor="cpf_pai">CPF do Pai</Label>
                <Input name="cpf_pai" id="cpf_pai" />
            </InputArea>
            <InputArea>
                <Label htmlFor="endereco">Endereço</Label>
                <Input name="endereco" id="endereco" />
            </InputArea>
            <InputArea>
                <Label htmlFor="telefone">Telefone</Label>
                <Input name="telefone" id="telefone" />
            </InputArea>
            <InputArea>
                <Label htmlFor="data_inicio">Data de Início</Label>
                <Input name="data_inicio" id="data_inicio" type="date" />
            </InputArea>
            <InputArea>
                <Label htmlFor="valor_mensalidade">Valor da mensalidade</Label>
                <Input name="valor_mensalidade" id="valor_mensalidade" type="float" />
            </InputArea>
            <InputArea>
                <Label htmlFor="data_desligamento">Data de Desligamento</Label>
                <Input name="data_desligamento" id="data_desligamento" type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
