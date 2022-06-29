const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dbms_mini',
    password: 968690,
})


module.exports = { pool }

