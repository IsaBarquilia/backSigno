CREATE DATABASE atividade_signo;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    signo VARCHAR(20) NOT NULL,
    datanascimento DATE NOT NULL,
    sexo VARCHAR(10) NOT NULL
);

INSERT INTO users (nome, email, idade, signo, datanascimento, sexo) VALUES ('João', 'joao@email.com', 35, 'Aquário', '1986-01-20', 'Masculino');