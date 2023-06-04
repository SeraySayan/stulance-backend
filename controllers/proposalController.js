const pool = require('../db');
const getProposals = (req, res) => {
    pool.query('SELECT * FROM "proposal"', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
module.exports = {
    getProposals,
};
