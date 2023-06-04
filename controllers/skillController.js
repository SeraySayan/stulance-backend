const pool = require('../db');
const getSkills = (req, res) => {
    pool.query(`SELECT * FROM "skill"`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
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
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM "skill" WHERE skill_id = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Skill deleted with ID: ${id}`);
    });
};
const updateSkill = (req, res) => {
    const id = parseInt(req.params.id);
    const { skill_name } = req.body;
    pool.query(`UPDATE "skill" SET skill_name = $1 WHERE skill_id = $2`, [skill_name, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Skill modified with ID: ${id}`);
    });
};

module.exports = {
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill,
};
