import { Document, model, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  author: string;
  date: string;
}

const noteSchema: Schema = new Schema(
  {
    title: String,
    content: { type: String, required: true },
    author: String,
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);
export default model<INote>('Note', noteSchema);
