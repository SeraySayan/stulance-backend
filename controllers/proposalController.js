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
const addProposal = (req, res) => {
    console.log('seray');
    console.log(req.user);
    console.log(req.body);
    const job_id = req.params.jobID;
    console.log(job_id);
    const { proposal_description, proposal_bid, proposal_status } = req.body;
    const email = req.user.email;
    pool.query(
        'INSERT INTO "proposal" (proposal_description, proposal_bid, proposal_status, freelancer_id, job_id) VALUES ($1, $2,$3, (SELECT user_id FROM "User" WHERE mail = $4),$5)',
        [proposal_description, proposal_bid, proposal_status, email, job_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`Proposal added with ID: ${results.insertId}`);
        }
    );
};

module.exports = {
    getProposals,
    getJobProposal,
    addProposal,
};
