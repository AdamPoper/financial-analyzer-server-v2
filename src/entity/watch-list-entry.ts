import { RowDataPacket } from "mysql2";
import GenericEntity from "./generic-entity";

export const WATCH_LIST_ENTRY_TABLE = 'watch_list_entry';

export interface WatchListEntry extends RowDataPacket, GenericEntity {
    id: number;
    watch_list_id: number;
    symbol: string;
}

export interface WatchListEntryModel {
    id: number;
    watchListId: number;
    symbol: string;
}

export const WatchListEntryQueries = {
    GET_WATCH_LIST_ENTRY_BY_WATCH_LIST_ID: 'SELECT * FROM watch_list_entry WHERE watch_list_id = ?',
}