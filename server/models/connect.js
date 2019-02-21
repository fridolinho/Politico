import pg from 'pg';
import dotenv from 'dotenv';
import app from '../index';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

export default pool;
