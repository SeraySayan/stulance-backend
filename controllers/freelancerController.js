const pool = require('../db');
const getFreelancers = (req, res) => {
    pool.query(`SELECT * FROM "User" WHERE user_type = 'freelancer' `, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getFreelancers,
};
