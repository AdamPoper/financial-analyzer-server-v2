import { RowDataPacket } from "mysql2";

export const WATCH_LIST_ENTRY_TABLE = 'watch_list_entry';

export interface WatchListEntry extends RowDataPacket {
    id: number;
    watch_list_id: number;
    symbol: string;
}

export interface WatchListEntryModel {
    id: number;
    watchListId: number;
    symbol: string;
}