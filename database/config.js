import { Pool } from 'pg';
import 'dotenv/config';
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const pool = new Pool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	allowExitOnIdle: true,
});

try {
	await pool.query('SELECT NOW()');
	console.log(`🧮 Conectado a base de datos "${DB_NAME}"`);
} catch (error) {
	console.log(error, 'Error al conectarse a la base de datos');
}
