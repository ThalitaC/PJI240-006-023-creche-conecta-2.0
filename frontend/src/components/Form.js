import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({ getAlunos, onEdit, setOnEdit }) => {
    const ref = useRef();
    const [fontSize, setFontSize] = useState(16); //tamanho da fonte

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
            aluno.cpf_mae.value = onEdit.cpf_mae.replace(/\D/g, '');
            aluno.nome_pai.value = onEdit.nome_pai;
            aluno.cpf_pai.value = onEdit.cpf_pai.replace(/\D/g, '');
            aluno.endereco.value = onEdit.endereco;
            aluno.telefone.value = onEdit.telefone.replace(/\D/g, '');
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

        // Limpar os campos
        aluno.reset();
        setOnEdit(null);
        getAlunos();
    };

    //Aumentar e diminuir o tamanho da fonte
    const increaseFontSize = () => setFontSize(prevSize => prevSize + 2);
    const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 2, 12)); //Tamanho mínimo

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <button className="btn btn-secondary me-2" onClick={increaseFontSize}>Aumentar Fonte</button>
                <button className="btn btn-secondary" onClick={decreaseFontSize}>Diminuir Fonte</button>
            </div>
            <form ref={ref} onSubmit={handleSubmit} style={{ fontSize: `${fontSize}px` }}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_aluno" className="form-label">Nome do Aluno</label>
                        <input name="nome_aluno" id="nome_aluno" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="data_nascimento" className="form-label">Data de Nascimento</label>
                        <input name="data_nascimento" id="data_nascimento" type="date" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="horario_entrada" className="form-label">Horário de Entrada</label>
                        <input name="horario_entrada" id="horario_entrada" type="time" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="horario_saida" className="form-label">Horário de Saída</label>
                        <input name="horario_saida" id="horario_saida" type="time" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_mae" className="form-label">Nome da Mãe</label>
                        <input name="nome_mae" id="nome_mae" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="cpf_mae" className="form-label">CPF da Mãe</label>
                        <input name="cpf_mae" id="cpf_mae" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_pai" className="form-label">Nome do Pai</label>
                        <input name="nome_pai" id="nome_pai" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="cpf_pai" className="form-label">CPF do Pai</label>
                        <input name="cpf_pai" id="cpf_pai" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input name="endereco" id="endereco" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input name="telefone" id="telefone" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="data_inicio" className="form-label">Data de Início</label>
                        <input name="data_inicio" id="data_inicio" type="date" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="valor_mensalidade" className="form-label">Valor da Mensalidade</label>
                        <input name="valor_mensalidade" id="valor_mensalidade" type="number" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="data_desligamento" className="form-label">Data de Desligamento</label>
                        <input name="data_desligamento" id="data_desligamento" type="date" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"> <i className="fas fa-check"></i> Salvar</button>
            </form>
        </div>
    );
};

export default Form;
