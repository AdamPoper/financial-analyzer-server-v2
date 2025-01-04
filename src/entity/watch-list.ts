import { RowDataPacket } from "mysql2";
import GenericEntity from "./generic-entity";

export const WATCH_LIST_TABLE = 'watch_list';

export interface WatchList extends RowDataPacket, GenericEntity {
    id: number;
    user_id: number;
    name: string
}

export const WatchListQueries = {
    GET_WATCH_LIST_BY_ID: "SELECT * from watch_list WHERE id = ?",
    GET_WATCH_LIST_BY_NAME_AND_USER_ID: "SELECT * from watch_list WHERE name = ? AND user_id = ?",
    GET_WATCH_LISTS_BY_USER_ID: "SELECT * from watch_list WHERE user_id = ?",
}
