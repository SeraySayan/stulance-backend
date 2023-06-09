const pool = require('../db');
const jwt = require('jsonwebtoken');
const getProposals = (req, res) => {
    const email = req.user.email;

    pool.query(
        `SELECT * FROM "proposal" p JOIN "User" u ON p.freelancer_id = u.user_id WHERE mail = $1`,
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};
const getJobProposal = (req, res) => {
    const jobID = req.params.jobID;
    const mail = req.user.email;
    console.log(jobID);
    console.log(mail);
    pool.query(
        `SELECT *
    FROM "proposal" p
    JOIN "job" j ON p.job_id = j.job_id  
    JOIN "User" u ON p.freelancer_id = u.user_id 
    WHERE j.job_id = $1`,
        [jobID],
        (error, results) => {
            if (error) {
                throw error;
            }

            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};

module.exports = {
    getProposals,
    getJobProposal,
};
