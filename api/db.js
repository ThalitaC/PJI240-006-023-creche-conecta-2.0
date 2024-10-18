import mysql from "mysql2";

export const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, // substituir pelo seu nome de usuário
    password: process.env.DATABASE_PASSWORD, // substituir pela sua senha
    database: process.env.DATABASE
})