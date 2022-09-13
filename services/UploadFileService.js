import path from "path";

class UploadFileService {
  constructor() {
    this.storagePath = './uploads/';
  }

  uploadFile = async function (files, fileField) {
    if (!files || Object.keys(files).length === 0 || !files[fileField]) {
      throw new Error('No files were uploaded.');
    }

    let file = files[fileField];
    let nameOfFile = file.md5 + path.extname(file.name)
    let uploadPath = this.storagePath + nameOfFile;

    await file.mv(uploadPath)

    return nameOfFile;
  }

  getFilePathByName = function (filename) {
    return this.storagePath + filename;
  }
}

export default UploadFileService;
