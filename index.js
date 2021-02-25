import express from 'express';
import cookieParser from 'cookie-parser';
import contactApi from './routes/api/contact.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/contact', contactApi);

app.listen(PORT, (res, req) => {
  console.log(`Server running on Port ${PORT}`)
});