const pool = require('../db');
const jwt = require('jsonwebtoken');

const signin = (req, res) => {
    const { email, password } = req.body;

    pool.query(`SELECT * FROM "User" WHERE mail = '${email}'  `, (error, results) => {
        if (error) {
            throw error;
        }
        const userType = results.rows[0].user_type;
        console.log('usertype', userType);
        if (results.rows.length !== 0) {
            if (results.rows[0].password === password) {
                jwt.sign(
                    { email, password, userType },
                    'HSDIUFSDYFYF8923HDHDQYD81DHJQHWJD',
                    (err, token) => {
                        if (err) return res.sendStatus(403);
                        res.cookie('token', token, { httpOnly: true });
                        res.json({ token: token, userType });
                    },
                    {
                        expriesIn: '1h',
                    }
                );
            }
        } else {
            res.status(401).json('User does not exist');
        }
    });
};
const signup = (req, res) => {
    console.log(req.body);
    const { name, surname, country, email, password, userType } = req.body;
    pool.query(`SELECT * FROM "User" WHERE mail = '${email}'  `, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length !== 0) {
            res.status(403).send('User already exists');
            console.log('User already exists');
        } else {
            console.log(userType);
            console.log(email);
            pool.query(
                `INSERT INTO "User" (name, surname, country, mail, password, user_type) VALUES ('${name}', '${surname}', '${country}', '${email}', '${password}', '${userType.toLowerCase()}')`,
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.status(201).send(`User added with ID: ${results.insertId}`);
                }
            );
        }
    });
};
const logout = (req, res) => {
    console.log('logout');
    console.log(req.cookies.token);
    // Destroy the token
    res.clearCookie('token');
    console.log(req.cookies.token);

    // Return a success response
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    signin,
    signup,
    logout,
};
