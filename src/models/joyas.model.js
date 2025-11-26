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
	const filtros = [];

	if (precio_min) {
		filtros.push(`precio >= ${precio_min}`);
	}

	if (precio_max) {
		filtros.push(`precio <= ${precio_max}`);
	}

	if (categoria) {
		filtros.push(`categoria = '${categoria}'`);
	}

	if (metal) {
	filtros.push(`metal = '${metal}'`)}

	let consulta = "SELECT * FROM inventario"
	if (filtros.length > 0) {
		consulta += ' WHERE ' + filtros.join(' AND ')
	}

	console.log(consulta); //para ver
	const result = await pool.query(consulta)
	return result.rows
};

export const joyasModel = { getAllJoyas, getFilteredJoyas };
