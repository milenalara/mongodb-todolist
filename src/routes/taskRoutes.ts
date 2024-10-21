import express, { Request, Response } from 'express';
import Task from '../models/Task'; 

const router = express.Router();

// Rota para obter todas as tarefas
router.get('/task', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find(); 
    res.json(tasks); 
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar as tarefas' });
  }
});

export default router;
