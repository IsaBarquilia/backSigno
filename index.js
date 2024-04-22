const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(express.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atividade_signo', 
  password: 'ds564', 
  port: 5432, 
});

app.get('/users', async (req, res) => {
    try {
       const resultado= await pool.query('SELECT * FROM users');
        res.json({
            total: resultado.rowCount,
            users: resultado.rows
        });
    } catch (e) {
      console.error(e);
      res.status(500).send({ mensagem: 'Erro ao listar signos!'});
         
    }
    });

    app.post('/users', async (req, res) => {

        try {
            const { nome, email, idade, signo, datanascimento, sexo } = req.body;
            await pool.query('INSERT INTO users (nome, email, idade, signo, datanascimento, sexo) VALUES ($1, $2)', [nome, email, idade, signo, datanascimento, sexo]);
            res.status(201).send({ message: 'Usuario inserido com sucesso' })
        } catch (error) {
            console.error('Erro ao inserir usuario');
            res.status(500).send({ message: 'Erro ao inserir usuario' });
        }
    });


    app.delete('/users/:id', async (req, res) => {

        try {
            const { id } = req.params;
            const { nome, email, idade, signo, datanascimento, sexo } = req.body;
    
            await pool.query('DELETE FROM users WHERE id = $1', [nome, email, idade, signo, datanascimento, sexo, id]);
            res.send({ message: 'Usuario deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar usuario');
            res.status(500).send({ message: 'Erro ao deletar usuario' });
        }
    });
    

    app.put('/users/:id', async (req, res) => {
        const { id } = req.params
        const { nome, email, idade, signo, datanascimento, sexo } = req.body;
        try {
            await pool.query('UPDATE usuario SET nome = $1, email = $2 WHERE id = $3', [nome, email, idade, signo, datanascimento, sexo,id]);
            res.send({ message: 'Usuario atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar usuario');
            res.status(500).send({ message: 'Erro ao atualizar usuario' });
        }
    });

app.get('/', async (req, res) => {
    res.status(200).send({ mensagem: 'Servidor backend rodando com sucesso🚀'});
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀🚀`);
  });
  