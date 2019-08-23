import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  timestamps: boolean;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', userSchema);
