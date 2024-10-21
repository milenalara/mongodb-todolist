import express, { Request, Response, Router } from 'express';
import User, { IUser } from '../models/User';
import Task, { ITask } from '../models/Task'

const router: Router = express.Router();

// get All
router.get('/', async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find();
        res.json(users);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
});

// create
router.post('/', async (req: Request, res: Response) => {
    try {
        const user = new User({
            name: req.body.name,
        })
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: 'Erro ao criar o usuário', errorMessage: error })
    }
})

// update
router.put('/:id', async (req: Request, res: Response):Promise<any> => {
    try {
        const user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (req.body.name != null) {
            user.name = req.body.name;
        }

        await user.save();

        res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message })
    }
})

// atribuir task ao user
router.put('/task/:userId', async (req: Request, res: Response):Promise<any> => {
    try {
        const user = await User.findById(req.params.userId);

        if (user == null) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const task = await Task.findById(req.body.taskId);

        if (task == null) {
            return res.status(404).json({message: 'Task não escontrada'})
        }

        user.tasks.push(task);

        await user.save();

        res.status(200).json({ message: 'Tarefa atribuída com sucesso', user });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message })
    }
})

// Rota para obter todas as tarefas de um usuário
router.get('/:userId/tasks', async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.userId).populate('tasks');
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.json(user.tasks);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: 'Erro ao buscar as tarefas do usuário', errorMessage: error.message });
    }
  });

export default router;