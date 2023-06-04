const { Pool } = require('pg');
const pool = new Pool({
    connectionString:
        'postgres://freelancer_app_db_user:VGwTWB2paJ95Tmnuw8qbsiGvOHBIPkvo@dpg-chnrh3e4dad6uianuitg-a.oregon-postgres.render.com/freelancer_app_db',
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;
