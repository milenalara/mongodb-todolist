import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

// Get all items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Create a new item
router.post('/', async (req: Request, res: Response) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price
  });

  try {
    const newItem: IItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

export default router;
