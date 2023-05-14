const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'teste',
  password: 'root',
  port: 5432,
});

const query = async (text, params) => {
  const result = await pool.query(text, params);
  return result;
};

module.exports = query; 
