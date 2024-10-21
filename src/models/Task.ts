import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ITask extends Document {
    text: string,
    deadline: Date,
    status: string,
    user: Schema.Types.ObjectId;
}