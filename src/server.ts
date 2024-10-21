import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';
import taskRoutes from './routes/taskRoutes'; // Importe a rota de tarefas

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Rotas
app.use('/items', itemRoutes);
app.use('/tasks', taskRoutes); // Use a rota de tarefas

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
