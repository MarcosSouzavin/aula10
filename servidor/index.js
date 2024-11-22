const express = require ('express');
const cors = require ('cors');
const mysql2 = require ('mysql2');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const db = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'alunos'
});

db.connect((erro)=> {
    if(erro){
        console.error('Erro ao conectar ao banco de dados', erro);
    }else{
        console.log('Conectando ao mysql com sucesso')
    }
});