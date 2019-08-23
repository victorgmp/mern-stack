import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

class UserController {
  public async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const newUser: IUser = new User({ username });
      await newUser.save();
      res.send({ message: 'User saved' });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      // const { id } = req.params;
      // console.log(id);
      await User.findOneAndDelete({ _id: req.params.id });
      res.json('User deleted');
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }

  // userCtrl.updateUser = async (req: Request, res: Response) => {
  //   // const { } = req.body;
  //   await User.findOneAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       username,
  //     },
  //   );
  //   res.json({ message: "User updated" });
  // };
}

export const userController = new UserController();
