import * as dotenv from 'dotenv';
dotenv.config();
import Server from '../server.js';
import MongoDB from '../configs/database.js'

const PORT = process.env.PORT ?? 3000;
const DB_URL = process.env.DATABASE_URL ?? '';

//database
const db = new MongoDB(DB_URL);
db.connect();

//application
const app = new Server(PORT);
app.run();

