const pool = require('../db');
const getFreelancers = async (req, res) => {
    try {
        const freelancersQuery = await pool.query(`SELECT * FROM "User" WHERE user_type = 'freelancer'`);
        const freelancers = freelancersQuery.rows;

        for (let i = 0; i < freelancers.length; i++) {
            const freelancer = freelancers[i];
            const skillsQuery = await pool.query(
                `SELECT skill_name FROM "skill" s
           JOIN "has_skill" hs ON s.skill_id = hs.skill_id
           JOIN "freelancer" f ON f.user_id = hs.freelancer_id
           WHERE f.user_id = $1`,
                [freelancer.user_id]
            );
            const skills = skillsQuery.rows.map((row) => row.skill_name);
            freelancers[i].skills = skills;
        }

        res.status(200).json(freelancers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getFreelancerProfile = (req, res) => {
    const email = req.user.email;
    pool.query(
        `SELECT * FROM "freelancer" f JOIN "User" u ON f.user_id = u.user_id WHERE u.mail= $1`,
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
    getFreelancers,
    getFreelancerProfile,
};
