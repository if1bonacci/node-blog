import UploadFileService from '../../services/UploadFileService.js'

describe('UploadFileService', () => {
  const uploadFileService = new UploadFileService()

  test('get path to uploaded file', () => {
    const filePath = "D:\\www\\node-blog\\uploads\\img.jpg"
    expect(uploadFileService.getFilePathByName('img.jpg')).toBe(filePath)
  })

  test('upload new file', async () => {
    let files = {
      avatar: {
        name: 'img.jpg',
        mimetype: 'image/jpeg',
        size: 6440,
        md5: '8232e0061d2c2c09f502a59c7dcadb94',
        mv: function () {}
      }
    }
    let result = await uploadFileService.uploadFile(files, 'avatar');

    expect(result).toEqual('8232e0061d2c2c09f502a59c7dcadb94.jpg');
  })

  test('empty file goes as expected', async () => {
    await expect(uploadFileService.uploadFile({}, 'avatar')).rejects.toThrow('No files were uploaded.');
    await expect(uploadFileService.uploadFile({}, 'avatar')).rejects.toThrow(Error);
  });
})
