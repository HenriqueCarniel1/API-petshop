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
    const sql = 'SELECT * FROM Users;';

    try {
        const result = await db.query(sql);
        console.log('Dados retornados:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
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
