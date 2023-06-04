const pool = require('../db');
const getContracts = (req, res) => {
    pool.query('SELECT * FROM "contract"', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
module.exports = {
    getContracts,
};
