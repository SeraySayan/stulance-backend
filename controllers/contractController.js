const pool = require('../db');
const jwt = require('jsonwebtoken');
const getContracts = (req, res) => {
    const email = req.user.email;
    pool.query(`SELECT user_type FROM "User" WHERE mail = $1`, [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (results.rows[0].user_type === 'freelancer') {
            getFreelancerContracts(email, res);
        } else {
            getCustomerContracts(email, res);
        }
    });
};
const getFreelancerContracts = (email, res) => {
    pool.query(
        `SELECT * FROM "contract" c 
        JOIN "proposal" p ON c.proposal_id = p.proposal_id
            JOIN "User" u ON u.user_id = p.freelancer_id
            WHERE u.mail = $1 `,
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'Contracts not found' });
                return;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};
const getCustomerContracts = (email, res) => {
    pool.query(
        `SELECT * FROM "contract" c 
        JOIN "job" j ON c.job_id = j.job_id
            JOIN "User" u ON u.user_id = j.customer_id
            WHERE u.mail = $1 `,
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'Contracts not found' });
                return;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};
const getAllContracts = (req, res) => {
    console.log(req.user);

    pool.query(`SELECT * FROM "contract" `, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ message: 'Contracts not found' });
            return;
        }
        console.log(results.rows);
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getContracts,
    getAllContracts,
};
