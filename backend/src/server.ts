import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import './database/connection';
import routes from './routes'
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/tmp/uploads', express.static(path.join(__dirname, '..', 'tmp', 'uploads')));

app.use(errorHandler);

app.listen(3333);