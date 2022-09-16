import mongoose from 'mongoose'

// export default class MongoDB {
//   constructor(url) {
//     this.url = url;
//     this.db = mongoose;
//   }
//   async connect() {
//     try {
//       await this.db.connect(this.url, {
//         useNewUrlParser: true
//       });
//
//       console.log('Database is running!');
//     } catch (err) {
//       console.log(err.message, err.code)
//     }
//   }
// }

export default function (url) {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true
    });

    console.log('Database is running!');
  } catch (err) {
    console.log(err.message, err.code)
  }
}
