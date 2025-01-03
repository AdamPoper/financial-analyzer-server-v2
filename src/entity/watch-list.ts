import { RowDataPacket } from "mysql2";

export const WATCH_LIST_TABLE = 'WatchList';

export interface WatchList extends RowDataPacket {
    id: number;
    user_id: number;
    name: string
}

export interface WatchListModel {
    id: number;
    userId: number;
    name: string;
}

export const WatchListQueries = {
    GET_WATCH_LIST_BY_ID: "SELECT * from watch_list WHERE id = ?",
    GET_WATCH_LIST_BY_NAME_AND_USER_ID: "SELECT * from watch_list WHERE name = ? AND user_id = ?",
}
