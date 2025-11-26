import { joyasModel } from '../models/joyas.model.js';

const getAllJoyas = async (req, res) => {
	try {
		const { order_by, limit, page } = req.query;
		const joyas = await joyasModel.getAllJoyas({ order_by, limit, page });
		res.status(200).json({ joyas });
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

export const joyasController = {
	getAllJoyas,
	getFilteredJoyas,
};
