import path from "path";

export default class UploadFileService {
  private __dirname: string
  private uploadDir: string
  private storagePath: string

  constructor() {
    this.__dirname = path.resolve();
    this.uploadDir = '/uploads/';
    this.storagePath = path.resolve(this.__dirname + this.uploadDir);
  }

  uploadFile = async (files: any, fileField: string) => {
    if (!files || Object.keys(files).length === 0 || !files[fileField]) {
      throw new Error('No files were uploaded.');
    }
    const file = files[fileField];
    const nameOfFile = file.md5 + path.extname(file.name)
    const uploadPath = path.resolve(this.storagePath, nameOfFile);

    await file.mv(uploadPath)

    return nameOfFile;
  }

  getFilePathByName = (filename: string): string => {
    return path.resolve(this.storagePath, filename);
  }
}
