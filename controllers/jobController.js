const pool = require('../db');
const jwt = require('jsonwebtoken');
const getJobs = (req, res) => {
    pool.query(
        `SELECT * FROM "job" j JOIN "User" u ON u.user_id = j.customer_id WHERE job_status = 'active' `,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
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
    const email = req.user.email;

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
};
const addJob = (req, res) => {
    console.log('seray');
    console.log(req.user);
    console.log(req.body);
    const { job_title, created_at, job_description, job_status, job_price } = req.body;
    const email = req.user.email;
    pool.query(
        'INSERT INTO "job" (job_title, created_at, job_description, job_status, job_price , customer_id) VALUES ($1, $2, $3, $4, $5, (SELECT user_id FROM "User" WHERE mail = $6))',
        [job_title, new Date(created_at), job_description, job_status, job_price, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ message: 'Job added successfully!' });
        }
    );
};

module.exports = {
    getJobs,
    getJobById,
    getMyJobs,
    addJob,
};
