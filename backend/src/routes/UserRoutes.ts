import { Router } from 'express';
import { userController } from '../controllers/UserController';

class UserRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public config(): void {
    const { getUsers, createUser, getUser, deleteUser } = userController;
    this.router
      .route('/')
      .get(getUsers)
      .post(createUser);

    this.router
      .route('/:id')
      .get(getUser)
      .delete(deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
