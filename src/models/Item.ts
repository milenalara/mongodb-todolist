import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for an Item
export interface IItem extends Document {
  name: string;
  price: number;
}

// Define the schema for Item
const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Export the Mongoose model
export default mongoose.model<IItem>('Item', itemSchema);
