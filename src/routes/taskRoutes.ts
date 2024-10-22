import express, { Request, Response } from 'express';
import Task from '../models/Task';

const router = express.Router();

// Rota para obter todas as tarefas
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar as tarefas' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const task = new Task({
      header: req.body.header,
      body: req.body.body,
      deadline: req.body.deadline,
      status: req.body.status
    })

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Erro ao criar a tarefa' })
  }
});

router.put('/:id', async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        header: req.body.header,
        body: req.body.body,
        deadline: req.body.deadline,
        status: req.body.status
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
  }
});

router.delete('/:id', async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar a tarefa' });
  }
});

export default router;