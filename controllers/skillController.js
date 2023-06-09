const pool = require('../db');
const jwt = require('jsonwebtoken');

const getMySkills = (req, res) => {
    const email = req.user.email;

    pool.query(
        `SELECT * FROM "skill" s JOIN "has_skill" hs ON s.skill_id = hs.skill_id
        JOIN "freelancer" f ON f.user_id = hs.freelancer_id`,
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'Skills not found' });
                return;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};

const addMySkills = (req, res) => {
    const email = req.user.email;

    const { skill_name } = req.body;
    pool.query(
        `INSERT INTO "has_skill" (freelancer_id, skill_id) 
             VALUES ((SELECT user_id FROM "User" WHERE mail = $1), 
             (SELECT skill_id FROM "skill" WHERE skill_name = $2))`,
        [email, skill_name],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rowCount === 0) {
                res.status(404).json({ message: 'Skill not found' });
                return;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};
const deleteMySkills = (req, res) => {
    const email = req.user.email;

    const { skill_name } = req.body;
    pool.query(
        `DELETE FROM "has_skill" WHERE freelancer_id = (SELECT user_id FROM "User" WHERE mail = $1) AND skill_id = (SELECT skill_id FROM "skill" WHERE skill_name = $2)`,
        [mail, skill_name],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rowCount === 0) {
                res.status(404).json({ message: 'Skill not found' });
                return;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};

const addSkill = (req, res) => {
    const { skill_name } = req.body;
    pool.query(`INSERT INTO "skill" (skill_name) VALUES ($1)`, [skill_name], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Skill added with name: ${skill_name}`);
    });
};
const deleteSkill = (req, res) => {
    const { skill_name } = req.body;
    pool.query(`DELETE FROM "skill" WHERE skill_name = $1`, [skill_name], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Skill deleted with name: ${skill_name}`);
    });
};

const getSkills = (req, res) => {
    pool.query(`SELECT * FROM "skill"`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getMySkills,
    addMySkills,
    deleteMySkills,
    getSkills,
    addSkill,
    deleteSkill,
};
