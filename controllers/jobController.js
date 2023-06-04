const pool = require('../db');
const getJobs = (req, res) => {
    pool.query('SELECT * FROM "job"', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
module.exports = {
    getJobs,
};
