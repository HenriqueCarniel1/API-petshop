const db = require('../db/db');

exports.Add = async (req, res) => {
    const { nomeDono, nomePet, telefoneDono, descricao, Data, Hora } = req.body;

    if (!nomeDono || !nomePet || !telefoneDono || !Data || !Hora) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const sql = `INSERT INTO Users (nomeDono, nomePet, telefoneDono, descricao, Data, Hora) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [nomeDono, nomePet, telefoneDono, descricao, Data, Hora];

    try {
        const result = await db.query(sql, values);
        console.log('Dados inseridos:', result.rows[0]);
        res.status(201).send('Dados inseridos');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Erro');
    }
};

exports.Get = async (req, res) => {
    const date = req.params.date;
    if (!date) {
        return res.status(400).send('Data não fornecida');
    }

    // SQL query que seleciona todos os registros na tabela 'Users' onde a data da coluna 'data' é igual à data passada como parâmetro
    const sql = `
        SELECT *
        FROM Users
        WHERE data = $1;
    `;

    try {
        // Executa a consulta no banco de dados com a data fornecida
        const result = await db.query(sql, [date]);  // Passa a data como parâmetro para evitar SQL injection
        console.log('Dados retornados:', result.rows);
        // Retorna os resultados da consulta em formato JSON
        res.status(200).json(result.rows);
    } catch (err) {
        // Loga e retorna um erro em caso de falha na consulta
        console.error('Error fetching data:', err);
        res.status(500).send('Erro ao buscar dados');
    }
};



exports.Delete = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).send('ID inválido');
    }

    const sql = 'DELETE FROM Users WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await db.query(sql, values);

        if (result.rowCount === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        console.log('Dados deletados:', result.rows[0]);
        res.status(200).send('Usuário deletado com sucesso');
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).send('Erro ao deletar dados');
    }
};
