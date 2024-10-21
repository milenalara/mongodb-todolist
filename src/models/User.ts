import mongoose, { Schema, Document } from 'mongoose';

// 1. Definir interface
export interface IUser extends Document {
    name: string,
    tasts: string[]
}

// 2. Definir o schema
const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

// 3. Exportar o modelo Mongoose
export default mongoose.model<IUser>('User', userSchema);