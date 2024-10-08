import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/items', itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
