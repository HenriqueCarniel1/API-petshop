-- Active: 1723076469470@@127.0.0.1@3306@phpmyadmin
-- Remove a tabela se ela já existir
create DATABASE pet;
use pet;
DROP TABLE IF EXISTS Users;

-- Cria a tabela com os campos necessários
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    nomeDono VARCHAR(255),
    nomePet VARCHAR(255),
    telefoneDono VARCHAR(20),
    descricao TEXT,
    Data DATE,
    Hora TIME
);

select * from Users;
