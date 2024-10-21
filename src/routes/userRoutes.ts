import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';

const router = express.Router();

// get All
router.get('/user', async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find();
        res.json(users);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
});

// create
router.post('/user', async (req: Request, res: Response) => {
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

