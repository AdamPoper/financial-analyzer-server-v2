import { RowDataPacket } from "mysql2";
import GenericEntity from "./generic-entity";

export const USER_TABLE = 'user';

export interface User extends RowDataPacket, GenericEntity {
    id: number;
    username: string;
    password: string;
}

export interface UserRequest {
    username: string;
    password: string;
}

export const UserQueries = {
    GET_USER_BY_ID: "SELECT * FROM user WHERE id = ?",
    GET_USER_BY_USERNAME: "SELECT * FROM user WHERE username = ?",
}