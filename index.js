const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade_signo',
    password: 'ds564',
    port: 7007,
});
function calcularIdade(dataNascimento) {
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mes = dataAtual.getMonth() - dataNasc.getMonth();
    if (mes < 0 || (mes === 0 && dataAtual.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade;
}
function calcularsigno(mes, dia){
    if (mes == 1 && dia >= 20 || mes == 2 && dia <= 18) {
        return "Aquário";
    }
    if (mes == 2 && dia >= 19 || mes == 3 && dia <= 20) {
        return "Peixes";
    }
    if (mes == 3 && dia >= 21 || mes == 4 && dia <= 19) {
        return "Áries";
    }
    if (mes == 4 && dia >= 20 || mes == 5 && dia <= 20) {
        return "Touro";
    }
    if (mes == 5 && dia >= 21 || mes == 6 && dia <= 21) {
        return "Gêmeos";
    }
    if (mes == 6 && dia >= 22 || mes == 7 && dia <= 22) {
        return "Câncer";
    }
    if (mes == 7 && dia >= 23 || mes == 8 && dia <= 22) {
        return "Leão";
    }
    if (mes == 8 && dia >= 23 || mes == 9 && dia <= 22) {
        return "Virgem";
    }
    if (mes == 9 && dia >= 23 || mes == 10 && dia <= 22) {
        return "Libra";
    }
    if (mes == 10 && dia >= 23 || mes == 11 && dia <= 21) {
        return "Escorpião";
    }
    if (mes == 11 && dia >= 22 || mes == 12 && dia <= 21) {
        return "Sagitário";
    }
    if (mes == 12 && dia >= 22 || mes == 1 && dia <= 19) {
        return "Capricórnio";
    }
}
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json({
            total: result.rowCount,
            users: result.rows
        })
    } catch (error) {
        console.error('Erro ao buscar usuários');
        res.status(500).send({ message: 'Erro ao buscar usuários' });
    }
});
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: 'Usuário não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).send('Erro ao obter usuário por ID');
    }
});
app.post('/users', async (req, res) => {
    
    try {
        const { nome, email, datanascimento, sexo } = req.body;
        const dataNascimento = new Date(datanascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = calcularsigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());
        await pool.query('INSERT INTO users (nome, email, idade, signo, datanascimento, sexo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, email, idade, signo, datanascimento, sexo]);
        res.send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário');
        res.status(500).send({ message: 'Erro ao cadastrar usuário' });
    }
});
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).send({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário');
        res.status(500).send({ message: 'Erro ao deletar usuário' });
    }
});
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, datanascimento, sexo } = req.body;
        const dataNascimento = new Date(datanascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = calcularsigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());
        await pool.query('UPDATE users SET nome = $1, email = $2, idade = $3, signo = $4, datanascimento = $5, sexo = $6 WHERE id = $7', [nome, email, idade, signo, datanascimento, sexo, id]);
        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário');
        res.status(500).send({ message: 'Erro ao atualizar usuário' });
    }
});
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});