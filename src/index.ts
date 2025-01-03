import express from 'express';
import watchListRouter from './routes/watch-list-routes';
import dotenv from 'dotenv';
import cors from 'cors';
import { setUser, basicAuth } from './auth/auth';
import authRouter from './routes/auth-routes';

dotenv.config();

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use('/watch-list', setUser, basicAuth, watchListRouter);
app.use('/authenticate', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});