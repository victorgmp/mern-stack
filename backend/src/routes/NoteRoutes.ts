import { Router } from 'express';
import { noteController } from '../controllers/NoteController';

class NoteRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public config(): void {
    const { getNotes, createNote, getNote, deleteNote, updateNote } = noteController;
    this.router
      .route('/')
      .get(getNotes)
      .post(createNote);

    this.router
      .route('/:id')
      .get(getNote)
      .put(updateNote)
      .delete(deleteNote);
  }
}

const noteRoutes = new NoteRoutes();
export default noteRoutes.router;
