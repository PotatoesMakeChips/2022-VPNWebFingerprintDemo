import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
    // This uses Javascript var types and not Typescript types
    tracking: { type: String, required: true },
    name: { type: String, required: true },
});

export interface User extends mongoose.Document {
    // Back to Typescript types here
    id: string;
    tracking: string;
    name: string;
}