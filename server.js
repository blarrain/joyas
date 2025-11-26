import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import joyasRoutes from './routes/joyas.route.js';
import { joyasLog } from './middleware/joyas.middleware.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(joyasLog)

app.use('/joyas', joyasRoutes);


//RUTA por defecto - error 404
/* app.get('*', (req, res) => {
	res.status(404).send('Esta ruta no existe');
}); */

app.listen(PORT, console.log(`🟢 Servidor arriba: http://localhost:${PORT}`));
