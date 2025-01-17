import { User, UserQueries, UserRequest, USER_TABLE } from "../entity/user";
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Persistence } from "../persistence/persistence";

const getUser = async (req: Request, res: Response) => {
    const loginFailMessage = 'Invalid user name or password';
    const {username, password} = req.query;
    const user: User = await Persistence.selectEntityByNamedQuery(UserQueries.GET_USER_BY_USERNAME, [username]);
    if (!user) {
        res.status(404).json({message: loginFailMessage});
        return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        const responseBody = {...user};
        delete responseBody.password;
        res.status(200).json(responseBody);
    } else {
        res.status(404).json({message: loginFailMessage});
    }
}

const addNewUser = async (req: Request, res: Response) => {
    const userRequest = req.body as UserRequest;
    const existingUser = await Persistence.selectEntityByNamedQuery<User>(UserQueries.GET_USER_BY_USERNAME, [userRequest.username]);
    if (existingUser) {
        res.status(400).json({message: 'User with name ' + userRequest.username + ' already exists'});
        return;
    }

    const hashedPassword = await bcrypt.hash(userRequest.password, 10);
    const user = {username: userRequest.username, password: hashedPassword} as User;

    Persistence.persistEntity<User>(USER_TABLE, user)
        .then(([result]) => res.status(200).json({id: result.insertId, ...user}));
}

export default {getUser, addNewUser};