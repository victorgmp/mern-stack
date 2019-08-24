import { Request, Response } from 'express';
import Note, { INote } from '../models/note';

class NoteController {
  public async getNotes(req: Request, res: Response): Promise<Response | void> {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  public async createNote(req: Request, res: Response) {
    try {
      const { title, content, date, author } = req.body;
      const newNote: INote = new Note({
        title,
        content,
        date,
        author,
      });
      await newNote.save();
      res.status(201).send({ message: 'Note saved' });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  public async getNote(req: Request, res: Response) {
    try {
      const note = await Note.findById(req.params.id);
      res.status(200).json(note);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  public async updateNote(req: Request, res: Response) {
    try {
      const { title, content, date, author } = req.body;
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          date,
          author,
        },
      );
      res.status(201).send({ message: 'Note updated' });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  public async deleteNote(req: Request, res: Response) {
    try {
      await Note.findOneAndDelete({ _id: req.params.id });
      res.status(201).send({ message: 'Note deleted' });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
}

export const noteController = new NoteController();
