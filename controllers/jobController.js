const pool = require('../db');
const jwt = require('jsonwebtoken');
const getJobs = (req, res) => {
    pool.query('SELECT * FROM "job"', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getJobById = (req, res) => {
    pool.query(`SELECT * FROM "job" WHERE job_id = '${req.params.id}'`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        console.log(results.rows);
        res.status(200).json(results.rows);
    });
};

const getMyJobs = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    jwt.verify(token, 'HSDIUFSDYFYF8923HDHDQYD81DHJQHWJD', (error, decodedToken) => {
        if (error) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        console.log(decodedToken);
        console.log(decodedToken.email);
        console.log(decodedToken.password);
        const email = decodedToken.email;
        pool.query(
            `SELECT * FROM "job" j JOIN "User" u ON u.user_id = j.customer_id WHERE u.mail = '${email}'`,
            (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.rows.length === 0) {
                    res.status(404).json({ message: 'Job not found' });
                    return;
                }

                console.log(results.rows);
                res.status(200).json(results.rows);
            }
        );
    });
};

module.exports = {
    getJobs,
    getJobById,
    getMyJobs,
};
