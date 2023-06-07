const pool = require('../db');
const jwt = require('jsonwebtoken');
const getProposals = (req, res) => {
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
        const email = decodedToken.email;
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
    });
};
module.exports = {
    getProposals,
};
