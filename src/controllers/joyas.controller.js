import { joyasModel } from '../models/joyas.model.js';
import 'dotenv/config';

const prepareHATEOAS = (joyas) => {
	const results = joyas
		.map((j) => {
			return {
				name: j.nombre,
				href: `http://localhost:${process.env.PORT}/joyas/${j.id}`,
			};
		})
		.slice(0, 4);
	const total = joyas.length;
	const HATEOAS = {
		total,
		results,
	};
	return {
		HATEOAS,
	};
};

const getAllJoyas = async (req, res) => {
	try {
		const { order_by, limit, page } = req.query;
		const joyas = await joyasModel.getAllJoyas({ order_by, limit, page });
		const HATEOAS = await prepareHATEOAS(joyas);
		res.status(200).json(HATEOAS);
		// res.status(200).json({ joyas });
	} catch (error) {
		res.status(500).json({ error: 'Error al procesar la solicitud' });
		console.error('Error =>', error);
	}
};

const getFilteredJoyas = async (req, res) => {
	try {
		const filters = req.query;
		const joyas = await joyasModel.getFilteredJoyas(filters);
		res.status(200).json({ joyas });
	} catch (error) {
		res.status(500).json({ error: 'Error al procesar la solicitud' });
		console.error('Error =>', error);
	}
};

const getJoyaByID = async (req, res) => {
	const id = req.params.id;

	try {
		const joya = await joyasModel.getJoyaByID(id);
		// console.log(joya, id) //Debug
		if (!joya) {
			return res.status(400).json({
					error: `No existe un producto con el ID ${id} en el inventario`,
				});
		}
		res.json(joya);
	} catch (error) {
		res.status(500).json({ error: 'Error al procesar la solicitud' });
		console.error('Error =>', error);
	}
};

export const joyasController = {
	getAllJoyas,
	getFilteredJoyas,
	getJoyaByID,
};
