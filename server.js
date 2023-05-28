const express = require('express');

const app = express();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString:
        'postgres://freelancer_app_db_user:VGwTWB2paJ95Tmnuw8qbsiGvOHBIPkvo@dpg-chnrh3e4dad6uianuitg-a.oregon-postgres.render.com/freelancer_app_db',
    ssl: {
        rejectUnauthorized: false,
    },
});

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/freelancers', (req, res) => {
    pool.query('SELECT * FROM public."skill"', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

app.listen(8000, () => {
    console.log(`App running on port 8000.`);
});
