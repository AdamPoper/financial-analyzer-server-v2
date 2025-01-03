import { Request, Response } from 'express';
import { Persistence } from '../persistence/persistence';
import { User, USER_TABLE, UserQueries } from '../entity/user';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const basicAuth = (req: Request, res: Response, next: () => void): void => {
    const user = req.user;
    if (!user) {
        res.status(401).send('No user provided');
        return;
    }

    next();
}

export const setUser = (req: Request, res: Response, next: () => void): void => {
    const id = req.query.userId;
    if (!id) {
        res.status(401).send('No user id');
        return;
    }

    Persistence.selectEntityByNamedQuery<User>(UserQueries.GET_USER_BY_ID, [id])
        .then((user: User) => {
            req.user = user;
            next();
        })
        .catch(() => res.status(500).send('Unable to find user ' + id));
}