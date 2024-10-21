import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';
import taskRoutes from './routes/taskRoutes'; // Nova rota de tarefas
import userRoutes from './routes/userRoutes'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro na conexão com o MongoDB:', err));

// Rotas
app.use('/items', itemRoutes); // Rota para itens (já existente)
app.use('/tasks', taskRoutes); // Rota para tarefas (nova)
app.use('/users', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
