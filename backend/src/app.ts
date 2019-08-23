import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// routes
import notesRoutes from './routes/NoteRoutes';
import usersRoutes from './routes/UserRoutes';

class Application {
  public app: express.Application;
  // public port: number = process.env.PORT || 4000;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  // settings
  public settings() {
    this.app.set('port', process.env.PORT || 4000);
  }
  // middlewares
  public middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  // routes
  public routes() {
    this.app.use('/api/users', usersRoutes);
    this.app.use('/api/notes', notesRoutes);
  }
  // star app
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}

export default Application;
