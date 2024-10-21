import express, { Request, Response, Router } from 'express';
import User, { IUser } from '../models/User';

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

        if (req.body.tasks != null) {
            user.tasks = req.body.tasks;
        }
        await user.save();

        res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message })
    }
})

export default router;