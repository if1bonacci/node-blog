import mongoose from 'mongoose'

class MongoDB {
  constructor(url) {
    this.url = url;
    this.db = mongoose;
  }
  async connect() {
    try {
      await this.db.connect(this.url, {
        useNewUrlParser: true
      });

      console.log('Database is running!');
    } catch (err) {
      console.log(err.message, err.code)
    }
  }
}

export default MongoDB;
