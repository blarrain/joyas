import format from 'pg-format';
import { pool } from '../../database/config.js';

const getAllJoyas = async ({ order_by = 'id_ASC', limit = 10, page = 1 }) => {
	const [column, direction] = order_by.split('_');
	const offset = (page - 1) * limit;
	const formattedQuery = format(
		'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
		column,
		direction,
		limit,
		offset
	);
	// console.log(formattedQuery); //para ver
	const response = await pool.query(formattedQuery);
	return response.rows;
};

const getFilteredJoyas = async ({
	precio_min,
	precio_max,
	categoria,
	metal,
}) => {
	let filtros = [];
	const values = [];

	const addFilter = (column, operator, value) => {
		values.push(value);
		const { length } = filtros;
		filtros.push(`${column} ${operator} $${length + 1}`);
	};

	if (precio_min) {
		addFilter('precio', '>=', precio_min);
	}

	if (precio_max) {
		addFilter('precio', '<=', precio_max);
	}

	if (categoria) {
		addFilter('categoria', '=', categoria);
	}

	if (metal) {
		addFilter('metal', '=', metal);
	}

	let consulta = 'SELECT * FROM inventario';
	if (filtros.length > 0) {
		filtros = filtros.join(' AND ');
		consulta += ` WHERE ${filtros}`;
	}

	// console.log(consulta); //para ver
	const result = await pool.query(consulta, values);
	return result.rows;
};

const getJoyaByID = async (id) => {
	/* const SQLquery = {
		text: 'SELECT FROM inventario WHERE id = $1',
		values: [id],
	};
	console.log(SQLquery); //para ver
	const result = await pool.query(SQLquery);
	return result.rows[0]; */
	const query = "SELECT * FROM inventario WHERE id = $1"
	const {rows} = await pool.query(query,[id])
	return rows[0]
};

export const joyasModel = {
	getAllJoyas,
	getFilteredJoyas,
	getJoyaByID,
};
