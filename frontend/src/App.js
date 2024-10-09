import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe os estilos do Bootstrap


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [alunos, setAlunos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getAlunos = async () => {
    try {
      const res = await axios.get("http://localhost:8000");

      setAlunos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAlunos();
  }, [setAlunos]);

  return (
    <>
      <Container>
        <Title>Alunos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getAlunos={getAlunos} />
        <Grid setOnEdit={setOnEdit} alunos={alunos} setAlunos={setAlunos} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
