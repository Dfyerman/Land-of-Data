const express = require('express');

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
    user: 'postgres',
    password: 'dfyerman',
    host: 'localhost',
    database: 'employees_db',
    },
    console.log('Connected to the employees_db database.')
)

pool.connect();

app.get('/api/departments', (req, res) => {
    const sql = `Select `
})







app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});