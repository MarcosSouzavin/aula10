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
    database: 'aulabd'
});

db.connect((erro)=> {
    if(erro){
        console.error('Erro ao conectar ao banco de dados', erro);
    }else{
        console.log('Conectando ao mysql com sucesso')
    }
});

//rota para cadastrar os alunos 
app.post('/aula10', (req, res) => {
    const { nome, cidade, estado } = req.body;
    const sql = 'INSERT INTO alunos (nome, cidade, estado) VALUES (?, ?, ?)';
    db.query(sql, [nome, cidade, estado], (err, result) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: 'erro ao cadastrar aluno.'});
        }
        res.status(201).json({message: 'Alunos cadastrado com sucesso!', id: result.insertId});
       // res.json(results);
    });
});
//rota para consultar os alunos 
app.get('/aula10', (req, res) => {
    const sql = 'SELECT * FROM alunos';
    db.query(sql, (err, results) => {
        if(err){
            return res.status(500).json({ error: 'Erro ao consultar alunos' });
        }
        res.json(results);
    });
});

app.listen(PORT, ()=>{
    console.log(`servidor rodando em https://localhost:${PORT}`);
});