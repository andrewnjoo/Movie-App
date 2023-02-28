import express, { Application } from 'express';
import cors from 'cors';

const authRouter = require('./authentication/routes/auth');
const movieRouter = require('./movies/routes/movie');

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: any, res: any) => {
  res.send('express root; try /movies to get all movies');
});

app.use('/auth', authRouter);

app.use('/movies', movieRouter);

export default app;
