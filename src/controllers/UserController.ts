import BaseController from "./BaseController";
import User from "../models/User";
import UploadFileService from "../services/UploadFileService";

class UserController extends BaseController {
  private uploadFileService: { getFilePathByName: Function, uploadFile: Function }
  constructor() {
    super();
    this.uploadFileService = new UploadFileService()
  }

  getAll = async (req, res) => {
    const users = await User.find();
    res.status(200).render('users', {users: users, title: 'Users list', subTitle: '', bg: 'home'})
  }

  getById = async (req, res) => {
    const user = await User.findOne({'id': req.params.id});
    res.status(200).render('user', {user: user, title: 'User info', subTitle: '', bg: 'home'})
  }

  getUserAvatar = async (req, res) => {
    let result = await this.uploadFileService.getFilePathByName(req.params.avatar)

    res.status(200).sendFile(result);
  }

  createUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(this.handlerErrors(err))
    }
  }

  uploadAvatar = async (req, res) => {
    try {
      let nameOfFile = await this.uploadFileService.uploadFile(req.files, 'avatar');
      const user = await User.findOne({id: req.params.id});
      user.avatar = nameOfFile;

      res.status(200).render('user', {user: user, title: 'User info', subTitle: '', bg: 'home'});
    } catch (err) {
      console.log(err);
      res.status(500).redirect(`/user/${req.params.id}?error=true`);
    }
  }

  remove = async (req, res) => {
    try {
      await User.deleteOne({id: req.params.id});

      return res.status(200).redirect(`/user?user_remove=true`);
    } catch (err) {
        res.status(500).json(this.handlerErrors(err));
    }
  }
}

export default UserController;
