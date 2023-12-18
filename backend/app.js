import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

import authRouter from './src/routes/auth.routes.js';
import mainRoutes from './src/routes/index.routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());

app.use('/api', mainRoutes);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log('Server listen in port: ' + PORT);
});
