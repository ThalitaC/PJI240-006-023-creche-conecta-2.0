import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  white-space: nowrap;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 100%;
  margin: 20px auto;
  font-size: 0.75em;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding:5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding:5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ alunos, setAlunos, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete(process.env.REACT_APP_URL + "/" + id)
            .then(({ data }) => {
                const newArray = alunos.filter((aluno) => aluno.id !== id);

                setAlunos(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome do Aluno</Th>
                    <Th>Data de Nascimento</Th>
                    <Th>Horário de Entrada</Th>
                    <Th>Horário de Saída</Th>
                    <Th>Nome da Mãe</Th>
                    <Th>CPF da Mãe</Th>
                    <Th>Nome do Pai</Th>
                    <Th>CPF do Pai</Th>
                    <Th>Endereço</Th>
                    <Th>Telefone</Th>
                    <Th>Data de Início</Th>
                    <Th>Valor da Mensalidade</Th>
                    <Th>Data de Desligamento</Th>
                    <Th></Th> {/* Coluna para editar */}
                    <Th></Th> {/* Coluna para deletar */}
                </Tr>
            </Thead>
            <Tbody>
                {alunos.map((item, i) => (
                    <Tr key={i}>
                        <Td width="10%">{item.nome_aluno}</Td>
                        <Td width="10%">{item.data_nascimento}</Td>
                        <Td width="10%">{item.horario_entrada}</Td>
                        <Td width="10%">{item.horario_saida}</Td>
                        <Td width="10%">{item.nome_mae}</Td>
                        <Td width="10%">{item.cpf_mae}</Td>
                        <Td width="10%">{item.nome_pai}</Td>
                        <Td width="10%">{item.cpf_pai}</Td>
                        <Td width="10%">{item.endereco}</Td>
                        <Td width="10%">{item.telefone}</Td>
                        <Td width="10%">{item.data_inicio}</Td>
                        <Td width="10%">{item.valor_mensalidade}</Td>
                        <Td width="10%">{item.data_desligamento}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );

};

export default Grid;