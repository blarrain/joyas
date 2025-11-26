import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import joyasRoutes from './routes/joyas.route.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/joyas', joyasRoutes);

app.listen(PORT, console.log(`🟢 Servidor arriba: http://localhost:${PORT}`));