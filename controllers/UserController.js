import BaseController from "./BaseController.js";
import User from "../models/User.js";
import UploadFileService from "../services/UploadFileService.js";

class UserController extends BaseController {
  constructor() {
    super();
    this.uploadFileService = new UploadFileService()
  }

  getAll = async (req, res) => {
    const users = await User.find();
    res.status(200).render('users', {users: users, title: 'Users list'})
  }

  getById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).render('user', {user: user})
  }

  getUserAvatar = async (req, res) => {
    let result = await this.uploadFileService.getFilePathByName(req.params.avatar)

    return res.status(200).download(result);
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
      let nameOfFile = await this.uploadFileService.uploadFile(req.files, 'avatar')
      const user = await User.updateOne({id: req.params.id}, {avatar: nameOfFile});

      res.status(200).render('user', {user: user});
    } catch (err) {
      console.log(err);
      return res.status(500).redirect(`/user/${req.params.id}?error=true`);
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
