import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "debian-sys-maint", // substituir pelo seu nome de usuário
    password: "Xxpr5HIg3TROhZyQ", // substituir pela sua senha
    database: "creche-conecta"
})

//TODO: substituir pelos dados da conexão com o banco na nuvem