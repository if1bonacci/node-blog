import BaseController from './BaseController'
import User from '../models/User'
import { Request, Response } from 'express'
import UploadFileService from '../services/UploadFileService'

class UserController extends BaseController {
  private uploadFileService: UploadFileService
  constructor() {
    super();
    this.uploadFileService = new UploadFileService()
  }

  getAll = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).render('users', {users: users, title: 'Users list', subTitle: '', bg: 'home'})
  }

  getById = async (req: Request, res: Response) => {
    const user = await User.findOne({'id': req.params.id});
    res.status(200).render('user', {user: user, title: 'User info', subTitle: '', bg: 'home'})
  }

  getUserAvatar = async (req: Request, res: Response) => {
    const result = await this.uploadFileService.getFilePathByName(req.params.avatar)

    res.status(200).sendFile(result);
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(this.handlerErrors(err))
    }
  }

  uploadAvatar = async (req: Request, res: Response) => {
    try {
      const nameOfFile = await this.uploadFileService.uploadFile(req.files, 'avatar');
      const user = await User.findOne({id: req.params.id});
      if (user instanceof User) {
        user.avatar = nameOfFile;
        res.status(200).render('user', {user: user, title: 'User info', subTitle: '', bg: 'home'});
      } else {
        throw new Error('User doesn\'t exist')
      }

    } catch (err) {
      console.log(err);
      res.status(500).redirect(`/user/${req.params.id}?error=true`);
    }
  }

  remove = async (req: Request, res: Response) => {
    try {
      await User.deleteOne({id: req.params.id});

      return res.status(200).redirect(`/user?user_remove=true`);
    } catch (err) {
        res.status(500).json(this.handlerErrors(err));
    }
  }
}

export default UserController;
