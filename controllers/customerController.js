// Load the pool connection
const pool = require('../db');

const getCustomers = (req, res) => {
    pool.query(`SELECT * FROM "customer" c JOIN "User" u ON c.user_id = u.user_id `, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
const updatePostedJobs = (req, res) => {
    const id = parseInt(req.params.id);
    const { posted_job_counter } = req.body;
    pool.query(
        `UPDATE "customer" SET posted_job_counter = posted_job_counter+1 WHERE user_id = {id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with ID: ${id}`);
        }
    );
};
const getCustomerProfile = (req, res) => {
    console.log('getCustomerProfile');
    console.log(req.user);
    const email = req.user.email;
    console.log(email);
    pool.query(
        `SELECT * FROM "customer" c JOIN "User" u ON c.user_id = u.user_id WHERE u.mail= $1`,
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

module.exports = {
    getCustomers,
    updatePostedJobs,
    getCustomerProfile,
};
