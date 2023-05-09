const { Pool } = require('pg')

// User your postgress credentials

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dbms_mini',
    password: 'xxxxxx',
})


module.exports = { pool }

