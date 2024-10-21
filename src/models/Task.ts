import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

// 1. Definir interface
export interface ITask extends Document {
    text: string,
    deadline: Date,
    status: string,
    user: Schema.Types.ObjectId;
}

// 2. Definir o schema
const taskSchema: Schema = new Schema({
    text: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['pendente', 'em progresso', 'concluido', 'em atraso'],
        default: 'pendente',
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});

// 3. Exportar o modelo Mongoose
export default mongoose.model<ITask>('Task', taskSchema);