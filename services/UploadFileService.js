import path from "path";

export default class UploadFileService {
  constructor() {
    this.__dirname = path.resolve();
    this.uploadDir = '/uploads/';
    this.storagePath = path.resolve(this.__dirname + this.uploadDir);
  }

  uploadFile = async function (files, fileField) {
    if (!files || Object.keys(files).length === 0 || !files[fileField]) {
      throw new Error('No files were uploaded.');
    }
    let file = files[fileField];
    let nameOfFile = file.md5 + path.extname(file.name)
    let uploadPath = path.resolve(this.storagePath, nameOfFile);

    await file.mv(uploadPath)

    return nameOfFile;
  }

  getFilePathByName = function (filename) {
    return path.resolve(this.storagePath, filename);
  }
}
